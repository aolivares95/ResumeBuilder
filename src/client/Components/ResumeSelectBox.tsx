import * as React from "react";
import { observer } from "mobx-react";
import { context } from "../../App";
import { IResume } from "../Models/Resume";
import CustomSelectBox from "./CustomSelectBox";

function ResumeSelectBox() {
  const {resumeStore} = React.useContext(context);

  const handleSelect = (event: any) => {
    resumeStore.setSelectedResume(resumeStore.getResume(event.target.value)!);
    console.log("handle select called:  " + resumeStore.selectedResume)
  };

  return (
    <CustomSelectBox items={resumeStore.resumes} handleSelect={handleSelect}></CustomSelectBox>
  )
}

export default observer(ResumeSelectBox);
