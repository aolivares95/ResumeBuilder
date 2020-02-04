import * as React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import { defaultStyles } from "../Styles";
import { Context } from "../../Context";

//interface IAddPage extends WithStyles<typeof defaultStyles> {}

const AddPage = ({ classes }: any) => {
  const { resumeStore, educationStore } = React.useContext(Context);

  const addResume = () => {
    let current = resumeStore.addResume("");
    resumeStore.setSelectedResume(current);
  };
  resumeStore.fetchResumes();

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
