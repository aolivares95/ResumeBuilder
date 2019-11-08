import * as React from "react";
import { observer } from "mobx-react";
import { context } from "../../App";

function ResumeSelectBox() {
  const store = React.useContext(context);
  function handleSelect(event: any) {
    event.preventDefault();
    const target = event.target.value;
    const temp = parseInt(target.substring(0, target.indexOf(":")));

    if (temp !== NaN) {
      store.setSelectedResume(temp);
    }
  }
  const items = store.resumes.map((item: any) => (
    <option>
      {item.id}: {item.name}
    </option>
  ));

  return <select onClick={handleSelect}>{items}</select>;
}

export default observer(ResumeSelectBox);
