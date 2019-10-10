import { types } from "mobx-state-tree";

const Resume = types
  .model("Resume", {
    id: types.number,
    name: types.optional(types.string, ""),
    phoneNumber: types.optional(types.string, ""),
    education: types.optional(types.string, ""),
    educationArray: types.optional(types.array(types.string), [])
  })
  .actions(self => {
    return {
      addEducation(education: string) {
        self.education = education;
      },
      addName(newName: string) {
        self.name = newName;
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
      }
    };
  });

export default Resume;
