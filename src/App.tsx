import React, { Component } from "react";
import "./App.css";
import ResumeForm from "./resumeForm";
import ResumeSelectPage from "./resumeSelectPage";
import { observer } from "mobx-react";

interface IApp {
  editPage: boolean;
  addPage: boolean;
  selectPage: boolean;
}

class App extends Component<any, IApp> {
  constructor(props: any) {
    super(props);
    this.toggleSelectPage = this.toggleSelectPage.bind(this);
    this.addResume = this.addResume.bind(this);
    this.toggleAddPage = this.toggleAddPage.bind(this);
    this.toggleEditPage = this.toggleEditPage.bind(this);

    this.state = {
      editPage: false,
      selectPage: false,
      addPage: true
    };
  }
  toggleSelectPage = (event: any) => {
    event.preventDefault();
    this.setState({ editPage: false, addPage: false, selectPage: true });
  };

  addResume = (event: any) => {
    event.preventDefault();
    this.props.rootStore.addResume({
      name: "",
      phoneNumber: "",
      education: "",
      educationArray: []
    });
    this.setState({ selectPage: false, addPage: false, editPage: true });
  };

  toggleAddPage = (event: any) => {
    event.preventDefault();
    this.setState({ addPage: !this.state.addPage });
  };

  toggleEditPage = (event: any) => {
    event.preventDefault();
    this.setState({ selectPage: false, addPage: false, editPage: true });
  };
  render() {
    if (this.state.addPage) {
      return (
        <div className="App">
          <button onClick={this.addResume}>Add Resume</button>
          <button onClick={this.toggleSelectPage}>Select resume</button>
        </div>
      );
    } else if (this.state.editPage) {
      return (
        <div className="App">
          <button onClick={this.toggleSelectPage}>Choose resume</button>
          <button onClick={this.toggleAddPage}>Back to main</button>
          <ResumeForm rootStore={this.props.rootStore} />
        </div>
      );
    } else if (this.state.selectPage) {
      return (
        <div className="App">
          <button onClick={this.toggleEditPage}>Edit resume</button>
          <ResumeSelectPage rootStore={this.props.rootStore} />
        </div>
      );
    }
  }
}

export default observer(App);
