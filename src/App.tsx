import React, { Component } from "react";
import "./App.css";
import EditResumePage from "./Pages/EditResumePage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddPage from "./Pages/AddPage";
import SelectResumePage from "./Pages/SelectResumePage";
import "reflect-metadata";
import rootStore from "./Models/resumeStore";

export const context = React.createContext(rootStore);

class App extends Component {
  render() {
    return (
      <context.Provider value={rootStore}>
        <Router>
          <Route exact path="/" component={AddPage}></Route>
          <Route exact path="/edit" component={EditResumePage}></Route>
          <Route exact path="/select" component={SelectResumePage}></Route>
        </Router>
      </context.Provider>
    );
  }
}

export default App;
