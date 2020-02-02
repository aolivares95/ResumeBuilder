import { ResumeStore } from "../Models/ResumeStore";
// import "jest-enzyme";

describe("Resume Store tests", () => {
  let rootStore: any;
  beforeEach(() => {
    rootStore = ResumeStore.create();
  });
  it("Adds a resume to the array when addResume is called", () => {
    rootStore.addResume("Kittens");
    expect(rootStore.resumes[0]).toHaveProperty("name", "Kittens");
  });
  /*
  it("Saves the resume when the save function is called", async () => {
    const data = {
      name: "res1",
      phoneNumber: "23454325"
    };
    rootStore.addResume("res1");
    await rootStore.saveResume(rootStore.resumes[0]);
    rootStore.fetchResumes().then(response => {
      console.log(response);
    });
    console.log("resumes:   " + JSON.stringify(rootStore));
    expect(rootStore.resumes[0].id).toEqual(1);
  });*/
});
