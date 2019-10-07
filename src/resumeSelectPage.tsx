import * as React from "react";
import { Component } from "react";
import { observer } from "mobx-react";

interface IResume {
  id: number;
  name: string;
}
class ResumeSelectPage extends Component<any> {
  render() {
    const items = this.props.rootStore.resumes.map((item: IResume) => (
      <option onClick={this.props.rootStore.setSelectedResume(item.id)}>
        {item.name}
      </option>
    ));
    let count = this.props.rootStore.id;
    return <select>{items}</select>;
  }
}

export default observer(ResumeSelectPage);
