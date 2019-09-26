import { Component } from "react";
import React from "react";
import Resume from "./Resume";
import resumeStore from "./resumeStore";
import { exportDefaultDeclaration } from "@babel/types";

let style = {
  padding: "10px"
};

interface IResume {
  name: string;
  phoneNumber: string;
  education: string[];
  isSubmitted: boolean;
}

export default class ResumeForm extends Component<any, IResume> {
  //rootStore=resumeStore.create();
  constructor(props: any) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: "",
      phoneNumber: "",
      education: [],
      isSubmitted: false
    };
  }

  handleInput(event: any) {
    const target = event.target;
    const name = target.name;
    if (name == "enterName") {
      this.setState({ name: target.value });
    } else if (name == "enterNumber") {
      this.setState({ phoneNumber: target.value });
    } else {
      this.setState({ education: [target.value] });

      //console.log(this.newResume.education);
    }
  }

  handleSubmit(event: any) {
    event.preventDefault();
    this.setState({ isSubmitted: true });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label style={style}>Please enter your name</label>
        <input
          onChange={this.handleInput}
          value={this.state.name}
          name="enterName"
          type="text"
        />
        <label style={style}>Please enter your phone number</label>
        <input
          value={this.state.phoneNumber}
          name="enterNumber"
          type="text"
          onChange={this.handleInput}
        />
        <label style={style}>Please enter your education history</label>
        <input
          onChange={this.handleInput}
          value={this.state.education}
          name="enterEducation"
          type="text"
        />
        <button type="submit" onClick={this.handleSubmit}>
          Add to history
        </button>
        {this.state.isSubmitted ? <p>Bullshit test value</p> : undefined}
      </form>
    );
  }
}
