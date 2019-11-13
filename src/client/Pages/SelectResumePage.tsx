import * as React from "react";
import ResumeSelectBox from "../Components/ResumeSelectBox";
import { Link } from "react-router-dom";
import { context } from "../../App";
import { WithStyles, withStyles } from "@material-ui/core";
import { defaultStyles } from "../Styles";

interface IAddPage extends WithStyles {}
function SelectResumePage(classes: any) {
  const store = React.useContext(context);
  return (
    <>
      <h1 style={classes.addH1Style}>Select Page</h1>
      <div style={classes.addDivStyle}>
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

export default withStyles(defaultStyles)(SelectResumePage);
