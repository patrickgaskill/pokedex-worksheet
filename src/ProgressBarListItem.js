// @flow
import React from "react";
import { List, Progress } from "semantic-ui-react";

type Props = {
  label: string,
  value: number,
  total: number
};

export default class ProgressBarListItem extends React.PureComponent<Props> {
  render() {
    const { label, value, total } = this.props;
    return (
      <List.Item>
        <Progress indicating size="tiny" value={value} total={total}>
          {label} ({value}/{total})
        </Progress>
      </List.Item>
    );
  }
}
