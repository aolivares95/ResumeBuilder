import * as React from "react";
import ResumeSelectBox from "../Components/ResumeSelectBox";
import { Link } from "react-router-dom";
import * as styles from "../Styles";
import { context } from "../App";

function SelectResumePage() {
  const store = React.useContext(context);
  return (
    <>
      <h1 style={styles.addH1Style}>Select Page</h1>
      <div style={styles.addDivStyle}>
        {store.getResume(0) ? (
          <Link to="/edit">
            <button>Edit resume</button>
          </Link>
        ) : (
          undefined
        )}
        <Link to="/">
          <button>Back to main</button>
        </Link>
        <ResumeSelectBox />
      </div>
    </>
  );
}

export default SelectResumePage;
