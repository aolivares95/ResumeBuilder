import { types } from "mobx-state-tree";
import Resume from "./Resume";
import { observable } from "mobx";

const resumeStore = types
  .model("resumeStore", {
    resumes: types.array(Resume)
  })
  .actions(self => {
    return {
      addResume(name: string, phoneNumber: string, education: []) {
        self.resumes.push({ name, phoneNumber, education });
      }
    };
  });

export default resumeStore;
