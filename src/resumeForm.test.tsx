import React from 'react';
import {shallow, mount, render} from 'enzyme'
import Resume from "./Resume";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe("Resume app tests", () => {
  it("Makes sure components renders correctly", ()=>{
    expect(shallow(<Resume/>).find('form').exists()).toBe(true)
  })
  it("Test to see if input is stored correctly", () => {});
});