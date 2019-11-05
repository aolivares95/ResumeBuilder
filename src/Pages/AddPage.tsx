import * as React from "react";
import { Link } from "react-router-dom";
import * as styles from "../Styles";
import { context } from "../App";

function AddPage() {
  const store = React.useContext(context);
  
  const addResume = () => {
    store.addResume("");
    store.setSelectedResume(store.id - 1);
  };

  return (
    <>
      <h1 style={styles.addH1Style}>Welcome to the Resume APP!</h1>
      <header style={styles.addDivStyle}>
        <Link to="/edit">
          <button
            style={styles.buttonStyle}
            id="add-resume"
            onClick={addResume}
          >
            Add Resume
          </button>
        </Link>
        <Link to="/select">
          <button style={styles.buttonStyle}>Select resume</button>
        </Link>
      </header>
    </>
  );
}

export default AddPage;
