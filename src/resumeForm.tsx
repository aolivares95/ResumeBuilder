import { Component } from "react";
import React from "react";
import Resume from "./Resume";
import resumeStore from "./resumeStore";
import { exportDefaultDeclaration } from "@babel/types";

let style = {
  padding: "10px"
};

let buttonStyle = {
  padding: "20px"
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
    this.displayInput = this.displayInput.bind(this);
    this.handleEducationInput = this.handleEducationInput.bind(this);
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
    }
    //console.log(this.newResume.education);
  }

  handleEducationInput(event: any) {
    this.setState({ education: [event.target.value] });
  }

  displayInput() {
    return (
      <>
        <p>
          Your name:
          {this.state.name}
        </p>
        <p>
          Your number:
          {this.state.phoneNumber}
        </p>
        Your education:
        {this.state.education}
      </>
    );
  }
  handleSubmit(event: any) {
    this.setState({ isSubmitted: !this.state.isSubmitted });
    event.preventDefault();
  }

  render() {
    return !this.state.isSubmitted ? (
      <form onSubmit={this.handleSubmit}>
        <label style={style}>Please enter your name</label>
        <input onChange={this.handleInput} name="enterName" type="text" />
        <label style={style}>Please enter your phone number</label>

        <input name="enterNumber" type="text" onChange={this.handleInput} />
        <label style={style}>Please enter your education history</label>
        <input
          onChange={this.handleEducationInput}
          name="enterEducation"
          type="text"
        />
        <div style={buttonStyle}>
          <button id="submit-button" type="submit" onClick={this.handleSubmit}>
            Add to history
          </button>
        </div>
      </form>
    ) : (
      <>
        <p id="user-input">{this.displayInput()}</p>
        <button onClick={this.handleSubmit}>Go back</button>
      </>
    );
  }
}
