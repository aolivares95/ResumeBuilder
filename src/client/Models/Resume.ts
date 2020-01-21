import { types, Instance } from "mobx-state-tree";
import { Education } from "./Education";
//import { saveEducation, saveResume } from "../../server/src/index";

const Resume = types
  .model("Resume", {
    id: types.maybe(types.number),
    name: types.optional(types.string, ""),
    phoneNumber: types.optional(types.string, ""),
    educationArray: types.array(types.reference(Education)),
    uuid: types.identifier
  })
  .actions(self => {
    return {
      addEducation(education: string) {
        self.educationArray.push(education)
      },
      addName(newName: string) {
        self.name = newName;
      },
      addId(id: number) {
        self.id = id;
      },
      
      addPhoneNumber(newNumber: string) {
        self.phoneNumber = newNumber;
      },
      clearResume() {
        self.name = "";
        self.phoneNumber = "";
        self.educationArray.clear();
      }
    };
  });

export default Resume;
export type IResume = Instance<typeof Resume>;
// export const ResumeSnapshot = getSnapshot(Resume.create({ id: 0 }));
