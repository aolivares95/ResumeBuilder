import * as React from "react";
import { observer } from "mobx-react";
import { context } from "../../App";
import { IResume } from "../Models/Resume";

function ResumeSelectBox() {
  const store = React.useContext(context);

  const items = store.resumes.map((item: IResume) => (
    <option value={item.uuid}>
      {item.id}: {item.name}
    </option>
  ));

  const handleSelect = (event: any) => {
    store.setSelectedResume(store.getResume(event.target.value)!);
  };

  return (
    <select defaultValue={""} onChange={handleSelect}>
      {store.selectedResume ? (
        <option>
          SELECTED: {store.selectedResume.id}:{store.selectedResume.name}
        </option>
      ) : (
        <option>Select a Resume to edit</option>
      )}
      {items}
    </select>
  );
}

export default observer(ResumeSelectBox);
