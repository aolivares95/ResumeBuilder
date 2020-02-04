import { types, Instance, getSnapshot } from "mobx-state-tree";
import { Education, IEducation } from "./Education";
import * as UUID from "uuid";
import axios from "axios";

export const EducationStore = types
  .model("EducationStore", {
    educationArray: types.array(Education),
      })
  .volatile(self => ({currentEdu:""}))
  .views(self =>({getEducationbyResId(resumeId:number){
    return self.educationArray.filter(edu=>edu.resumeId===resumeId)
  }}))
  .actions(self => {
    function addEducation(newResumeId:number, degree?:string) {
      let current = Education.create({ uuid: UUID.v4(), degree:degree, resumeId : newResumeId });
      self.educationArray.push(current);
      saveEducation(current)
      return current.uuid
    }
    function saveEducation(currentEdu: IEducation) {
      const eduSnap = getSnapshot(currentEdu);
      axios
        .post("http://localhost:5000/addEducation", eduSnap)
        .catch(() => console.log("Post failed..."));
    }

    const setCurrentEdu = (cur:string) => {
      self.currentEdu=cur;
    }
    return {
      addEducation,
      saveEducation,
      setCurrentEdu
    };
  });

  export type IEducationStore = Instance <typeof EducationStore>