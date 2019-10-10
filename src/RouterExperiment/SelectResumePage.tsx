import * as React from "react";
import { Component } from "react";
import ResumeSelectBox from "../Components/ResumeSelectBox";
import { Link } from "react-router-dom";

class SelectResumePage extends Component<any> {
  render() {
    return (
      <div>
        <Link to="/edit">
          <button>Edit resume</button>
        </Link>
        <Link to="/">
          <button>Back to main</button>
        </Link>
        <ResumeSelectBox rootStore={this.props.rootStore} />
      </div>
    );
  }
}

export default SelectResumePage;
