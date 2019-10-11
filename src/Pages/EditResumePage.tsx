import { Component } from "react";
import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

let style = {
  padding: "10px"
};

let buttonStyle = {
  padding: "20px"
};

//add more fields for things to match real resume
//add styles
//add backend
//add tests

class EditResumePage extends Component<any> {
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
      this.props.rootStore
        .getResume(this.props.rootStore.selectedResume)
        .addName(target.value);
    } else if (name === "enterNumber") {
      this.props.rootStore
        .getResume(this.props.rootStore.selectedResume)
        .addPhoneNumber(target.value);
    } else {
      this.props.rootStore
        .getResume(this.props.rootStore.selectedResume)
        .addEducation(target.value);
    }
  }

  displayInput() {
    let items;
    if (this.props.rootStore.getResume(this.props.rootStore.selectedResume)) {
      items = this.props.rootStore
        .getResume(this.props.rootStore.selectedResume)
        .educationArray.map((item: string) => <li>{item}</li>);
    } else {
      items = <li></li>;
    }

    if (this.props.rootStore.getResume(this.props.rootStore.selectedResume)) {
      return (
        <>
          <p>
            Your name:
            {
              this.props.rootStore.getResume(
                this.props.rootStore.selectedResume
              ).name
            }
          </p>
          <p>
            Your number:
            {
              this.props.rootStore.getResume(
                this.props.rootStore.selectedResume
              ).phoneNumber
            }
          </p>
          <ul>
            Your education:
            {items}
          </ul>
        </>
      );
    } else {
      return <p>empty</p>;
    }
  }

  handleSubmit(event: any) {
    event.preventDefault();
    this.props.rootStore.setIsSubmitted(!this.props.rootStore.isSubmitted);
  }
  handleAddEducation(event: any) {
    event.preventDefault();
    if (
      this.props.rootStore.getResume(this.props.rootStore.selectedResume)
        .education !== ""
    ) {
      this.props.rootStore
        .getResume(this.props.rootStore.selectedResume)
        .saveEducation();
    }
    this.props.rootStore
      .getResume(this.props.rootStore.selectedResume)
      .addEducation(event.target.value);
    this.props.rootStore.setIsEducationSubmitted(
      !this.props.rootStore.isEducationSubmitted
    );
  }

  handleClearResume(event: any) {
    event.preventDefault();
    this.props.rootStore
      .getResume(this.props.rootStore.selectedResume)
      .clearResume();
  }

  render() {
    let items;
    if (this.props.rootStore.getResume(this.props.rootStore.selectedResume)) {
      items = this.props.rootStore
        .getResume(this.props.rootStore.selectedResume)
        .educationArray.map((item: string) => <li>{item}</li>);
    } else {
      items = <li></li>;
    }
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
            <Link to="/">
              <button>Go back</button>
            </Link>
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

export default observer(EditResumePage);
