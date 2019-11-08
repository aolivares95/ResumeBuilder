import React from "react";
import { mount, ReactWrapper } from "enzyme";
import AddPage from "../client/Pages/AddPage";
import { MemoryRouter } from "react-router-dom";
import { context } from "../App";
import rootStore from "../client/Models/ResumeStore";

describe("Add page tests", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter initialEntries={["/"]}>
        <AddPage />
      </MemoryRouter>,
      { context: context }
    );
  });
  it("Adds a resume to the store when the add button is clicked", () => {
    let button = wrapper.find("#add-resume");
    button.simulate("click");
    expect(rootStore.resumes).toHaveLength(1);
  });

  it("Displays the text Welcome to the Resume APP!", () => {
    expect(wrapper.text()).toContain("Welcome to the Resume APP!");
  });
});
