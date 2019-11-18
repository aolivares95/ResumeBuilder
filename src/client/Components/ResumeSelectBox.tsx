import * as React from "react";
import { observer } from "mobx-react";
import { context } from "../../App";
import { IResume } from "../Models/Resume";

function ResumeSelectBox() {
  const store = React.useContext(context);

  function handleSelect(event: any) {
    event.preventDefault();
    const target = event.target.value;
    const temp = parseInt(target.substring(0, target.indexOf(":")));

    if (isNaN(temp)) {
      store.setSelectedResume(store.resumes[temp]);
    }
  }
  const items = store.resumes.map((item: IResume) => (
    <option>
      {item.id}: {item.name}
    </option>
  ));

  return <select onClick={handleSelect}>{items}</select>;
}

export default observer(ResumeSelectBox);
