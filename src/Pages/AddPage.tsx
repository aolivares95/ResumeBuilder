import * as React from "react";
import { Link } from "react-router-dom";
import { addDivStyle, addH1Style, buttonStyle } from "../Styles";
import { context } from "../App";

function AddPage() {
  const store = React.useContext(context);
  const addResume = (event: any) => {
    store.addResume({
      name: "",
      phoneNumber: "",
      education: "",
      educationArray: []
    });
    store.setSelectedResume(store.id - 1);
  };

  return (
    <>
      <h1 style={addH1Style}>Welcome to the Resume APP!</h1>
      <header style={addDivStyle}>
        <Link to="/edit">
          <button style={buttonStyle} id="add-resume" onClick={addResume}>
            Add Resume
          </button>
        </Link>
        <Link to="/select">
          <button style={buttonStyle}>Select resume</button>
        </Link>
      </header>
    </>
  );
}

export default AddPage;
