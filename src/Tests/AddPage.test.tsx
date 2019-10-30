import React from "react";
import { shallow, mount } from "enzyme";
import AddPage from "../Pages/AddPage";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { ResumeStore } from "../Models/ResumeStore";
import App from "../App";

configure({ adapter: new Adapter() });

let fakeRootstore = ResumeStore.create();
let context = React.createContext(fakeRootstore);
let wrapper = mount(
  <context.Provider value={fakeRootstore}>
    <App></App>
  </context.Provider>
);
//add functionspy????
describe("Add page tests", () => {
  it("Adds a resume to the store when the add button is clicked", () => {
    let addMock = jest.mock("./src/AddPage.tsx", () => {});
    let button = wrapper.find("#add-resume");
    button.simulate("click");
    expect(addMock).toHaveBeenCalled();
  });
});
