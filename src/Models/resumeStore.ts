import { types } from "mobx-state-tree";
import Resume, { IResume } from "./Resume";
import { observable } from "mobx";

export const ResumeStore = types
  .model("ResumeStore", {
    resumes: types.array(Resume),
    id: 0,
    isSubmitted: false,
    isEducationSubmitted: false,
    selectedResume: 0
  })
  .actions(self => {
    return {
      addResume(newResume: string) {
        let current = Resume.create({ id: self.id });
        current.addName(newResume);
        this.push(current);
        this.incrementId();
      },
      push(newResume: IResume) {
        self.resumes.push(newResume);
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
      },
      incrementId() {
        self.id++;
      }
    };
  });

const rootStore = ResumeStore.create();

export default observable(rootStore);
