import React from "react";
import { mount, ReactWrapper } from "enzyme";
import AddPage from "../Pages/AddPage";
import { MemoryRouter } from "react-router-dom";

describe("Add page tests", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter initialEntries={["/"]}>
        <AddPage />
      </MemoryRouter>
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
