import React from "react";
import PropTypes from "prop-types";
import { List, Progress } from "semantic-ui-react";

export default class ProgressBarListItem extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
  };

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
