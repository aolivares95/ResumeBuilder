import { types, Instance } from "mobx-state-tree";
//import { saveEducation, saveResume } from "../../server/src/index";

export const Education = types.model("Education", {
  id: types.maybe(types.number),
  degree: types.optional(types.string, ""),
  resumeId: 0,
  uuid: types.identifier,
});
export type IEducation = Instance<typeof Education>;
