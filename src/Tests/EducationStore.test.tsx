import {
  EducationStore,
  IEducationStore
} from "../client/Models/EducationStore";
import typeorm from "typeorm";

describe("education store test", () => {
  let edustore: IEducationStore;

  beforeEach(() => {
    edustore = EducationStore.create({
      educationArray: [
        { resumeId: 1, uuid: "1", degree: "test" },
        { resumeId: 2, uuid: "2", degree: "test2" }
      ]
    });
  });
  it("should return a filtered list of education", () => {
    expect(edustore.getEducationbyResId(1)).toEqual([
      { resumeId: 1, uuid: "1", degree: "test" }
    ]);
  });

  it("should fetch requirements", () => {
    // jest.spyOn(global, "fetch");
    //fetchmock here
    expect(typeorm.getRepository).toHaveBeenCalled();
  });
});
