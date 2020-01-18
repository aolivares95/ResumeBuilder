import { types, Instance, getSnapshot } from "mobx-state-tree";
import { Education, IEducation } from "./Education";
import * as UUID from "uuid";
import axios from "axios";

export const EducationStore = types
  .model("EducationStore", {
    educationArray: types.array(Education),
    id: types.maybe(types.number)
  })
  .actions(self => {
    function addEducation(newEducation: string) {
      let current = Education.create({ uuid: UUID.v4() });
      self.educationArray.push(current);
    }
    function saveEducation(currentEdu: IEducation) {
      const eduSnap = getSnapshot(currentEdu);
      axios
        .post("http://localhost:5000/addEducation", eduSnap)
        .catch(() => console.log("Post failed..."));
    }
    return {
      addEducation,
      saveEducation
    };
  });
