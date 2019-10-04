import { Component } from "react";
import React from "react";

let style = {
  padding: "10px"
};

let buttonStyle = {
  padding: "20px"
};

interface IResume {
  name: string;
  phoneNumber: string;
  education: string;
  isSubmitted: boolean;
  isEducationSubmitted: boolean;
  educationArray: string[];
}

export default class ResumeForm extends Component<any, IResume> {
  //rootStore=resumeStore.create();

  constructor(props: any) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayInput = this.displayInput.bind(this);
    this.handleAddEducation = this.handleAddEducation.bind(this);
    this.handleClearResume = this.handleClearResume.bind(this);
    this.state = {
      name: "",
      phoneNumber: "",
      education: "",
      isSubmitted: false,
      isEducationSubmitted: false,
      educationArray: []
    };
  }

  handleInput(event: any) {
    const target = event.target;
    const name = target.name;

    if (name === "enterName") {
      this.setState({ name: target.value });
    } else if (name === "enterNumber") {
      this.setState({ phoneNumber: target.value });
    } else {
      this.setState({ education: target.value });
    }
  }

  displayInput() {
    const items = this.state.educationArray.map(item => <li>{item}</li>);
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
        <ul>
          Your education:
          {items}
        </ul>
      </>
    );
  }

  handleSubmit(event: any) {
    this.setState({ isSubmitted: !this.state.isSubmitted });
    event.preventDefault();
  }
  handleAddEducation(event: any) {
    event.preventDefault();
    if (this.state.education !== "") {
      this.state.educationArray.push(this.state.education);
    }
    this.setState({ education: "" });
    this.setState({ isEducationSubmitted: !this.state.isEducationSubmitted });
  }

  handleClearResume(event: any) {
    event.preventDefault();
    this.setState({
      name: "",
      phoneNumber: "",
      education: "",
      educationArray: []
    });
  }

  render() {
    const { educationArray, isEducationSubmitted, isSubmitted } = this.state;
    const items = educationArray.map(item => <li>{item}</li>);

    return !isSubmitted ? (
      <>
        <form>
          <label style={style}>Please enter your name</label>
          <input onChange={this.handleInput} name="enterName" type="text" />
          <label style={style}>Please enter your phone number</label>

          <input name="enterNumber" type="text" onChange={this.handleInput} />
          <label style={style}>Please enter your education history</label>

          {!isEducationSubmitted ? (
            <input
              name="enterEducation"
              type="text"
              onChange={this.handleInput}
            />
          ) : (
            <ul>{items}</ul>
          )}

          <button onClick={this.handleAddEducation}>Add/view education</button>
          <div style={buttonStyle}>
            <button
              id="submit-button"
              type="submit"
              onClick={this.handleSubmit}
            >
              Preview resume
            </button>
          </div>
        </form>
      </>
    ) : (
      <>
        <p id="user-input">{this.displayInput()}</p>
        <button onClick={this.handleSubmit}>Go back</button>
        <button onClick={this.handleClearResume}>Clear resume</button>
      </>
    );
  }
}
