import { ResumeStore } from "../client/Models/ResumeStore";

describe("Resume Store tests", () => {
  let rootStore: any;
  beforeEach(() => {
    rootStore = ResumeStore.create();
  });
  it("Adds a resume to the array when addResume is called", () => {
    rootStore.addResume("Kittens");
    expect(rootStore.resumes[0]).toMatchObject({ id: 0, name: "Kittens" });
  });
});
