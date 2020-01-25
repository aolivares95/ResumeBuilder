import { types, Instance } from "mobx-state-tree";
import { EducationStore } from "./EducationStore";
import { ResumeStore } from "./ResumeStore";

export const RootStore = types
  .model("ResumeStore", {
    isSubmitted: false,
    isEducationSubmitted: false,
    educationStore: types.optional(EducationStore, {}),
    resumeStore:types.optional(ResumeStore, {}),
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

export const rootStore = RootStore.create();

export type IRootStore = Instance<typeof RootStore>