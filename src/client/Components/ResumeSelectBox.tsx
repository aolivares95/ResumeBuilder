import * as React from "react";
import { observer } from "mobx-react";
import CustomSelectBox from "./CustomSelectBox";
import { Context } from "../../Context";

function ResumeSelectBox() {
  const { resumeStore } = React.useContext(Context);

  const handleSelect = (event: any) => {
    resumeStore.setSelectedResume(event.target.value);
  };

  return (
    <CustomSelectBox
      items={resumeStore.resumes}
      handleSelect={handleSelect}
    ></CustomSelectBox>
  );
}

export default observer(ResumeSelectBox);
