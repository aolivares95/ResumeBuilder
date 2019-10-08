import * as React from "react";
import { Component } from "react";
import { observer } from "mobx-react";
import { types } from "mobx-state-tree";

interface IResume {
  id: number;
  name: string;
}
class ResumeSelectPage extends Component<any> {
  constructor(props: any) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect = (event: any) => {
    const temp = parseInt(event.target.value[0]);
    this.props.rootStore.setSelectedResume(temp);
    console.log(event.target.value);
  };
  render() {
    const items = this.props.rootStore.resumes.map((item: any) => (
      <option>
        {item.id}: {item.name}
      </option>
    ));

    let count = this.props.rootStore.id;
    console.log("Item ID: " + count);
    return <select onClick={this.handleSelect}>{items}</select>;
  }
}

export default observer(ResumeSelectPage);
