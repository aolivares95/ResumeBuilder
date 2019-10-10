import * as React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";

class AddPage extends Component<any> {
  addResume = (event: any) => {
    event.preventDefault();
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
      <div>
        <Link to="/edit">
          <button onClick={this.addResume}>Add Resume</button>
        </Link>
        <Link to="/select">
          <button>Select resume</button>
        </Link>
      </div>
    );
  }
}

export default AddPage;
