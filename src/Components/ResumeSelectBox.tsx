import * as React from "react";
import { Component } from "react";
import { observer } from "mobx-react";

class ResumeSelectBox extends Component<any> {
  constructor(props: any) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect = (event: any) => {
    event.preventDefault();
    const target = event.target.value;
    const temp = parseInt(target.substring(0, target.indexOf(":")));

    if (temp !== NaN) {
      this.props.rootStore.setSelectedResume(temp);
    }
  };
  render() {
    const items = this.props.rootStore.resumes.map((item: any) => (
      <option>
        {item.id}: {item.name}
      </option>
    ));

    return <select onClick={this.handleSelect}>{items}</select>;
  }
}

export default observer(ResumeSelectBox);
