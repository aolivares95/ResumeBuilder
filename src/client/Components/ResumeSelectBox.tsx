import * as React from "react";
import { observer } from "mobx-react";
import CustomSelectBox from "./CustomSelectBox";
import { Context } from "../../Context";
import { applySnapshot } from "mobx-state-tree";

function ResumeSelectBox() {
  const { resumeStore, educationStore } = React.useContext(Context);

  const handleSelect = async (event: any) => {
    await resumeStore.setSelectedResume(event.target.value);
    await educationStore
      .fetchEducation(resumeStore.selectedResume!.id!)
      .then((data) => {
        console.log("fetch called, isFetched= " + educationStore.isFetched);
        applySnapshot(
          resumeStore.selectedResume!.educationArray,
          data.map((data) => data.uuid)
        );
      });
  };

  return (
    <CustomSelectBox
      items={resumeStore.resumes}
      handleSelect={handleSelect}
    ></CustomSelectBox>
  );
}

export default observer(ResumeSelectBox);
