import React from "react";
import { shallow, mount, render } from "enzyme";
import Resume from "../Models/Resume";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ResumeForm from "../Pages/EditResumePage";

describe("Resume app tests", () => {
  /*const wrapper = shallow(<ResumeForm />);
  it("Makes sure components renders correctly", () => {
    expect(wrapper.find("form").exists()).toBe(true);
  });
  it("Tests to see if button click displays user data", () => {
    const button = wrapper.find("#preview-button");
    button.simulate("Click");
    // expect(wrapper.find("#user-input")).not.toBeUndefined();
  });*/

  it("does nothing", () => {
    expect(1).toBeTruthy();
  });
});
