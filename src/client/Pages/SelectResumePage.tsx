import * as React from "react";
import ResumeSelectBox from "../Components/ResumeSelectBox";
import { Link } from "react-router-dom";
import { context } from "../../App";
import { withStyles } from "@material-ui/core";
import { defaultStyles } from "../Styles";

const SelectResumePage = ({ classes }: any) => {
  const {resumeStore} = React.useContext(context);

 
    resumeStore.fetchResumes().then(data => {
      resumeStore.addToMap(data);})
    

  return (
    <>
      <h1 className={classes.addH1Style}>Select Page</h1>
      <div className={classes.addDivStyle}>
        {resumeStore.itemsInResume ? (
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
};

export default withStyles(defaultStyles)(SelectResumePage);
