import * as React from "react";
import { observer } from "mobx-react";
import { context } from "../../App";
import { IResume } from "../Models/Resume";

function ResumeSelectBox() {
  const {resumeStore} = React.useContext(context);

  const items = resumeStore.resumes.map((item: IResume) => (
    <option value={item.uuid}>
      {item.id}: {item.name}
    </option>
  ));

  const handleSelect = (event: any) => {
    resumeStore.setSelectedResume(resumeStore.getResume(event.target.value)!);
  };

  return (
    <select defaultValue={""} onChange={handleSelect}>
      {resumeStore.selectedResume ? (
        <option>
          SELECTED: {resumeStore.selectedResume.id}:{resumeStore.selectedResume.name}
        </option>
      ) : (
        <option>Select a Resume to edit</option>
      )}
      {items}
    </select>
  );
}

export default observer(ResumeSelectBox);
