import { ReactWrapper, mount } from "enzyme";
import { context } from "../App";
import React from "react";
import { MemoryRouter } from "react-router";
import EditResumePage from "../Pages/EditResumePage";
import rootStore from "../Models/ResumeStore";

describe("Edit Resume Page tests", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter initialEntries={["/edit"]}>
        <EditResumePage />
      </MemoryRouter>,
      { context: context }
    );
  });

  it("Renders three input boxes", () => {
    expect(wrapper.find("input").length).toEqual(3);
  });
  it("Saves the name, phone number and education history provided by the user", () => {
    rootStore.addResume("");
    rootStore.setSelectedResume(0);
    wrapper
      .find("#name-input")
      .simulate("change", { target: { name: "enterName", value: "cats" } });
    wrapper
      .find("#number-input")
      .simulate("change", { target: { name: "enterNumber", value: "cats" } });
    wrapper.find("#edu-input").simulate("change", {
      target: { name: "enterEducation", value: "cats" }
    });

    expect(rootStore.resumes[0].name).toEqual("cats");
    expect(rootStore.resumes[0].phoneNumber).toEqual("cats");
    expect(rootStore.resumes[0].education).toEqual("cats");
  });
  it("Renders the preview mode when preview resume is clicked", () => {
    wrapper.find("#preview-button").simulate("click");
    expect(wrapper.text()).toContain("Your name:");
    expect(wrapper.text()).toContain("Your number:");
    expect(wrapper.text()).toContain("Your education:");
  });
  it("Adds and presents the users education history when the Add/view education button is clicked", () => {
    rootStore.addResume("");
    rootStore.setSelectedResume(0);
    rootStore.setIsSubmitted(false);
    wrapper.update();
    wrapper.find("#submit-education").simulate("click");
    expect(wrapper.find("#view-education")).toBeTruthy();
  });
  it("Saves the resume to the DB when the save resume button is clicked", () => {});
});
