import * as React from "react";
import ResumeSelectBox from "../Components/ResumeSelectBox";
import { Link } from "react-router-dom";
import { context } from "../../App";
import { withStyles } from "@material-ui/core";
import { defaultStyles } from "../Styles";

const SelectResumePage = ({ classes }: any) => {
  const store = React.useContext(context);

  React.useEffect(() => {
    store.ResumeStore.fetchResumes().then(data => {
      store.ResumeStore.addToMap(data);
    });
  }, [store]);

  return (
    <>
      <h1 className={classes.addH1Style}>Select Page</h1>
      <div className={classes.addDivStyle}>
        {store.ResumeStore.itemsInResume ? (
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
