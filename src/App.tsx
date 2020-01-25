import React from "react";
import "./App.css";
import EditResumePage from "./client/Pages/EditResumePage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddPage from "./client/Pages/AddPage";
import SelectResumePage from "./client/Pages/SelectResumePage";
import { AppBar, Toolbar } from "@material-ui/core";

export const App = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <h1>Resume App</h1>
        </Toolbar>
      </AppBar>
      <Router>
        <Route exact path="/" component={AddPage}></Route>
        <Route exact path="/edit" component={EditResumePage}></Route>
        <Route exact path="/select" component={SelectResumePage}></Route>
      </Router>
    </>
  );
};

export default App;
