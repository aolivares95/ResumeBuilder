import { ReactWrapper, mount } from "enzyme";
import React from "react";
import EditResumePage from "../client/Pages/EditResumePage";
import { MemoryRouter } from "react-router";
import { IRootStore, RootStore } from "../client/Models/RootStore";
import { Context } from "../Context";
import "jest-enzyme";

describe("Edit Resume Page tests", () => {
  let wrapper: ReactWrapper;
  let rootStore: IRootStore;
  beforeEach(() => {
    rootStore = RootStore.create({
      isSubmitted: false,
      isEducationSubmitted: false,
      resumeStore: {
        selectedResume: "1234",
        resumes: [{ uuid: "1234", id: 1 }],
        resumeMap: { "1234": "1234" }
      },
      educationStore: { educationArray: [] }
    });
    wrapper = mount(
      <Context.Provider value={rootStore}>
        <MemoryRouter initialEntries={["/edit"]}>
          <EditResumePage />
        </MemoryRouter>
      </Context.Provider>
    );
  });

  it("render something", () => {
    expect(wrapper.find(EditResumePage)).toBeTruthy();
  });
});
