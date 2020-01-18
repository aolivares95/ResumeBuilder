import * as React from "react";
import { Link } from "react-router-dom";
import { context } from "../../App";
import { withStyles } from "@material-ui/core";
import { defaultStyles } from "../Styles";

//interface IAddPage extends WithStyles<typeof defaultStyles> {}

const AddPage = ({ classes }: any) => {
  const store = React.useContext(context);

  const addResume = () => {
    let current = store.addResume("");
    store.setSelectedResume(current);
    store.saveResume(current);
  };

  return (
    <>
      <h1 className={classes.addH1Style}>Welcome to the Resume APP!</h1>
      <header className={classes.addDivStyle}>
        <Link to="/edit">
          <button
            className={classes.buttonStyle}
            id="add-resume"
            onClick={addResume}
          >
            Add Resume
          </button>
        </Link>
        <Link to="/select">
          <button className={classes.buttonStyle}>Select resume</button>
        </Link>
      </header>
    </>
  );
};

export default withStyles(defaultStyles)(AddPage);
