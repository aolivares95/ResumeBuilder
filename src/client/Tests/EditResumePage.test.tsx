import { ReactWrapper, mount } from "enzyme";
import React from "react";
import EditResumePage from "../Pages/EditResumePage";
import { RootStore, IRootStore } from "../Models/RootStore";
import { MemoryRouter } from "react-router-dom";
import "jest-enzyme";
import { Context } from "../../Context";

describe("Edit Resume Page tests", () => {
  let wrapper: ReactWrapper;
  let rootStore: IRootStore;
  beforeEach(() => {
    rootStore = RootStore.create({
      resumeStore: { resumes: [] },
      educationStore: { educationArray: [] }
    });
    wrapper = mount(
      <Context.Provider value={rootStore}>
        <MemoryRouter initialEntries={["/edit"]}>
          <EditResumePage />
        </MemoryRouter>
      </Context.Provider>,
      { context: Context }
    );
  });

  it("Renders three input boxes", () => {
    console.log("wrapper value" + wrapper.debug());
    expect(wrapper.find("input").length).toEqual(3);
  });
  it("Saves the name, phone number and education history provided by the user", () => {
    rootStore.resumeStore.addResume("");
    rootStore.resumeStore.setSelectedResume(rootStore.resumeStore.resumes[0]);
    console.log(
      "Selected resume: " + JSON.stringify(rootStore.resumeStore.selectedResume)
    );

    wrapper
      .find("#name-input")
      .simulate("change", { target: { name: "enterName", value: "cats" } });
    wrapper
      .find("#number-input")
      .simulate("change", { target: { name: "enterNumber", value: "cats" } });
    wrapper.find("#edu-input").simulate("change", {
      target: { name: "enterEducation", value: "cats" }
    });

    expect(rootStore.resumeStore.resumes[0].name).toEqual("cats");
    expect(rootStore.resumeStore.resumes[0].phoneNumber).toEqual("cats");
    expect(rootStore.resumeStore.resumes[0].educationArray).toEqual("cats");
  });
  it("Renders the preview mode when preview resume is clicked", () => {
    wrapper.find("#preview-button").simulate("click");
    expect(wrapper.text()).toContain("Your name:");
    expect(wrapper.text()).toContain("Your number:");
    expect(wrapper.text()).toContain("Your education:");
  });
  it("Adds and presents the users education history when the Add/view education button is clicked", () => {
    rootStore.resumeStore.addResume("");
    rootStore.resumeStore.setSelectedResume(rootStore.resumeStore.resumes[0]);
    rootStore.setIsSubmitted(false);
    wrapper.update();
    wrapper.find("#submit-education").simulate("click");
    expect(wrapper.find("#view-education")).toBeTruthy();
  });
  it("Saves the resume to the DB when the save resume button is clicked", () => {});
});
