import React, { Component } from "react";
import "./App.css";
import EditResumePage from "./Pages/EditResumePage";
import rootStore from "./Models/resumeStore";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddPage from "./RouterExperiment/AddPage";
import SelectResumePage from "./RouterExperiment/SelectResumePage";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={AddPage}>
          <AddPage rootStore={rootStore} />
        </Route>
        <Route exact path="/edit" component={EditResumePage}>
          <EditResumePage rootStore={rootStore} />
        </Route>
        <Route exact path="/select" component={SelectResumePage}>
          <SelectResumePage rootStore={rootStore} />
        </Route>
      </Router>
    );
  }
}

export default App;
