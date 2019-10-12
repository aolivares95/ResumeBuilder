import * as React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { addDivStyle, addH1Style } from "../Styles";

class AddPage extends Component<any> {
  addResume = (event: any) => {
    this.props.rootStore.addResume({
      name: "",
      phoneNumber: "",
      education: "",
      educationArray: []
    });
    this.props.rootStore.setSelectedResume(this.props.rootStore.id - 1);
  };

  render() {
    return (
      <>
        <h1 style={addH1Style}>Welcome to the Resume APP!</h1>
        <header style={addDivStyle}>
          <Link to="/edit">
            <button onClick={this.addResume}>Add Resume</button>
          </Link>
          <Link to="/select">
            <button>Select resume</button>
          </Link>
        </header>
      </>
    );
  }
}

export default AddPage;
