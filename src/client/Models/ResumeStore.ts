import { types } from "mobx-state-tree";
import Resume, { IResume } from "./Resume";
import { observable } from "mobx";
import { EducationStore } from "./EducationStore";

export const ResumeStore = types
  .model("ResumeStore", {
    resumes: types.array(Resume),
    id: 0,
    isSubmitted: false,
    isEducationSubmitted: false,
    selectedResume: 0,
    //EducationStore: types.model("EducationStore")
  })
  .actions(self => {
    return {
      addResume(newResume: string) {
        let current = Resume.create({ id: self.id });
        current.addName(newResume);
        self.resumes.push(current);
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
      },
      setSelectedResume(sel: number) {
        self.selectedResume = sel;
      }
    };
  });

const rootStore = ResumeStore.create();

export default observable(rootStore);
