import {
  types,
  Instance,
  getSnapshot,
  flow,
  applySnapshot,
} from "mobx-state-tree";
import { Education, IEducation } from "./Education";
import * as UUID from "uuid";
import axios from "axios";

export const EducationStore = types
  .model("EducationStore", {
    educationArray: types.array(Education),
    educationMap: types.optional(types.map(types.reference(Education)), {}),
    isFetched: false,
  })
  .volatile((self) => ({ currentEdu: "" }))
  .views((self) => ({
    getEducationbyResId(resumeId: number) {
      return self.educationArray.filter((edu) => edu.resumeId === resumeId);
    },
  }))
  .actions((self) => {
    const addToMap = (array: IEducation[]) => {
      self.educationMap.clear();
      array.forEach((item) => {
        self.educationMap.put(item);
      });
    };
    return { addToMap };
  })
  .actions((self) => {
    const fetchEducation = flow(function* fetchEducation() {
      yield fetch("http://localhost:5000/education/")
        .then((result) => {
          if (result.ok) {
            return result.json();
          } else {
            return Promise.reject(result.statusText);
            // throw new Error("Fetch failed");
          }
        })
        .then((data) => {
          applySnapshot(self.educationArray, data);
        });
      self.addToMap(self.educationArray);
      return self.educationArray;
    });

    function addEducation(
      newResumeId: number,
      resuuid?: string,
      degree?: string
    ) {
      let current = Education.create({
        uuid: UUID.v4(),
        degree: degree,
        resumeId: newResumeId,
      });
      self.educationArray.push(current);
      saveEducation(current, resuuid);
      return current.uuid;
    }
    function saveEducation(currentEdu: IEducation, resuuid?: string) {
      const eduSnap = getSnapshot(currentEdu);
      axios
        .post("http://localhost:5000/addEducation/" + resuuid, eduSnap)
        .catch(() => console.log("Post failed..."));
    }

    const setCurrentEdu = (cur: string) => {
      self.currentEdu = cur;
    };
    return {
      addEducation,
      saveEducation,
      setCurrentEdu,
      fetchEducation,
    };
  });

export type IEducationStore = Instance<typeof EducationStore>;
