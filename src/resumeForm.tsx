import { Component } from "react";
import React from "react";
import { observer } from "mobx-react";

let style = {
  padding: "10px"
};

let buttonStyle = {
  padding: "20px"
};

class ResumeForm extends Component<any> {
  constructor(props: any) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayInput = this.displayInput.bind(this);
    this.handleAddEducation = this.handleAddEducation.bind(this);
    this.handleClearResume = this.handleClearResume.bind(this);
  }

  handleInput(event: any) {
    const target = event.target;
    const name = target.name;

    if (name === "enterName") {
      this.props.rootStore.getResume(0).addName(target.value);
    } else if (name === "enterNumber") {
      this.props.rootStore.getResume(0).addPhoneNumber(target.value);
    } else {
      this.props.rootStore.getResume(0).addEducation(target.value);
    }
  }

  displayInput() {
    const items = this.props.rootStore
      .getResume(0)
      .educationArray.map((item: string) => <li>{item}</li>);
    return (
      <>
        <p>
          Your name:
          {this.props.rootStore.getResume(0).name}
        </p>
        <p>
          Your number:
          {this.props.rootStore.getResume(0).phoneNumber}
        </p>
        <ul>
          Your education:
          {items}
        </ul>
      </>
    );
  }

  handleSubmit(event: any) {
    this.props.rootStore.setIsSubmitted(!this.props.rootStore.isSubmitted);
    event.preventDefault();
  }
  handleAddEducation(event: any) {
    event.preventDefault();
    if (this.props.rootStore.getResume(0).education !== "") {
      this.props.rootStore.getResume(0).saveEducation();
    }
    this.props.rootStore.getResume(0).addEducation(event.target.value);
    this.props.rootStore.setIsEducationSubmitted(
      !this.props.rootStore.isEducationSubmitted
    );
  }

  handleClearResume(event: any) {
    event.preventDefault();
    this.props.rootStore.getResume(0).clearResume();
  }

  render() {
    this.props.rootStore.addResume({
      name: "",
      phoneNumber: "",
      education: "",
      educationArray: []
    });
    const items = this.props.rootStore
      .getResume(0)
      .educationArray.map((item: string) => <li>{item}</li>);
    return !this.props.rootStore.isSubmitted ? (
      <>
        <form>
          <label style={style}>Please enter your name</label>
          <input onChange={this.handleInput} name="enterName" type="text" />
          <label style={style}>Please enter your phone number</label>

          <input name="enterNumber" type="text" onChange={this.handleInput} />
          <label style={style}>Please enter your education history</label>

          {!this.props.rootStore.isEducationSubmitted ? (
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
              id="preview-button"
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
        <button id="go-back" onClick={this.handleSubmit}>
          Go back
        </button>
        <button id="clear-resume" onClick={this.handleClearResume}>
          Clear resume
        </button>
      </>
    );
  }
}

export default observer(ResumeForm);
