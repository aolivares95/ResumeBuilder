import { types } from "mobx-state-tree";
import Resume from "./Resume";
import { observable } from "mobx";

const resumeStore = types
  .model("resumeStore", {
    resumes: types.array(Resume),
    id: 0,
    isSubmitted: false,
    isEducationSubmitted: false
  })
  .actions(self => {
    return {
      addResume(newResume: any) {
        newResume.id = self.id;
        self.resumes.push(newResume);
        self.id++;
      },
      getResume(id: number) {
        return self.resumes[id];
      },
      setIsSubmitted(newIsSubmitted: boolean) {
        self.isSubmitted = newIsSubmitted;
      },
      setIsEducationSubmitted(newIsEducationSubmitted: boolean) {
        self.isEducationSubmitted = newIsEducationSubmitted;
      }
    };
  });

const rootStore = resumeStore.create();

export default observable(rootStore);
