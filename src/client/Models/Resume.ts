import { types, Instance, getSnapshot } from "mobx-state-tree";
//import { saveEducation, saveResume } from "../../server/src/index";

const Resume = types
  .model("Resume", {
    id: types.number,
    name: types.optional(types.string, ""),
    phoneNumber: types.optional(types.string, ""),
    education: types.optional(types.string, ""),
    educationArray: types.optional(types.array(types.string), []),
    uuid: types.optional(types.string, "")
  })
  .actions(self => {
    return {
      addEducation(education: string) {
        self.education = education;
      },
      addName(newName: string) {
        self.name = newName;
      },
      addId(id: number) {
        self.id = id;
      },
      saveEducation() {
        self.educationArray.push(self.education);
      },
      addPhoneNumber(newNumber: string) {
        self.phoneNumber = newNumber;
      },
      clearResume() {
        self.name = "";
        self.phoneNumber = "";
        self.educationArray.clear();
        self.education = "";
      } /*
      save() {
        saveResume(self.name, self.phoneNumber);
        saveEducation(self.educationArray, self.uuid);
        
      }*/
    };
  });

export default Resume;
export type IResume = Instance<typeof Resume>;
// export const ResumeSnapshot = getSnapshot(Resume.create({ id: 0 }));
