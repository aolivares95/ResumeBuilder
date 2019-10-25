import React from "react";
import { shallow, ReactWrapper } from "enzyme";
import AddPage from "../Pages/AddPage";
import rootStore from "../Models/resumeStore";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Add page tests", () => {
  let wrapper = shallow(<AddPage />);

  it("Adds a resume to the store when the add button is clicked", () => {
    let button = wrapper.find("#add-resume");
    button.simulate("click");
    expect(rootStore.getResume(0)).toBeTruthy();
  });
});
