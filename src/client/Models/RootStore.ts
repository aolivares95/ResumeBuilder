import { types } from "mobx-state-tree";
import Resume from "./Resume";
import { observable } from "mobx";
import { EducationStore } from "./EducationStore";
import { ResumeStore } from "./ResumeStore";

export const RootStore = types
  .model("ResumeStore", {
    resumes: types.array(Resume),
    id: types.maybe(types.number),
    isSubmitted: false,
    isEducationSubmitted: false,
    selectedResume: types.maybe(types.reference(Resume)),
    resumeMap: types.map(types.reference(Resume)),
    EducationStore: EducationStore,
    ResumeStore: ResumeStore
  })
  .actions(self => {
    function setIsSubmitted(newIsSubmitted: boolean) {
      self.isSubmitted = newIsSubmitted;
    }
    function setIsEducationSubmitted(newIsEducationSubmitted: boolean) {
      self.isEducationSubmitted = newIsEducationSubmitted;
    }
    return {
      setIsSubmitted,
      setIsEducationSubmitted
    };
  });
const rootStore = RootStore.create();

export default observable(rootStore);
