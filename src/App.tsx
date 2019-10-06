import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Resume from "./Resume";
import resumeStore from "./resumeStore";
import ResumeForm from "./resumeForm";

class App extends Component<any> {
  render() {
    return (
      <div className="App">
        <ResumeForm rootStore={this.props.rootStore} />
      </div>
    );
  }
}

export default App;
