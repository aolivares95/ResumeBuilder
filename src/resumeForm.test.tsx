import React from "react";
import { shallow, mount, render } from "enzyme";
import Resume from "./Resume";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ResumeForm from "./resumeForm";

//fix tests
configure({ adapter: new Adapter() });

describe("Resume app tests", () => {
  let wrapper = shallow(<ResumeForm />);
  it("Makes sure components renders correctly", () => {
    expect(wrapper.find("form").exists()).toBe(true);
  });
  it("Test to see if button click displays user data", () => {
    wrapper.simulate("Click");
    expect(wrapper.find("#user-input")).not.toBeUndefined();
  });
});
