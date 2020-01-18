import { types, Instance } from "mobx-state-tree";
//import { saveEducation, saveResume } from "../../server/src/index";

export const Education = types.model("Education", {
  id: types.maybe(types.number),
  degree: types.optional(types.string, ""),
  resumeId: types.maybe(types.number),
  uuid: types.optional(types.string, "")
});
export type IEducation = Instance<typeof Education>;