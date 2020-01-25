import * as React from "react";
import { observer } from "mobx-react";
import { Context } from "../..";
import { IResume } from "../Models/Resume";
import CustomSelectBox from "./CustomSelectBox";

function ResumeSelectBox() {
  const {resumeStore} = React.useContext(Context);

  const handleSelect = (event: any) => {
    resumeStore.setSelectedResume(resumeStore.getResume(event.target.value)!);
    console.log("handle select called:  " + resumeStore.selectedResume)
  };

  return (
    <CustomSelectBox items={resumeStore.resumes} handleSelect={handleSelect}></CustomSelectBox>
  )
}

export default observer(ResumeSelectBox);
