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
    console.log("Event target value:     " + event.target.value);
    store.setSelectedResume(store.getResume(event.target.value)!);
  };

  return <select onChange={handleSelect}>{items}</select>;
}

export default observer(ResumeSelectBox);
