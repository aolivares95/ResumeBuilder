import { types } from "mobx-state-tree";
import Resume, { IResume } from "./Resume";
import { observable } from "mobx";
import { Education } from "./Education";
import * as UUID from "uuid";

export const EducationStore = types
  .model("EducationStore", {
    educationArray: types.array(Education),
    id: types.maybe(types.number)
  })
  .actions(self => {
    return {
      addEducation(newEducation: string) {
        let current = Education.create({ uuid: UUID.v4() });
        self.educationArray.push(current);
      }
    };
  });
