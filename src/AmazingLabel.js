import React from "react";
import PropTypes from "prop-types";
import { Label } from "semantic-ui-react";

export default class AmazingLabel extends React.PureComponent {
  static propTypes = {
    amazing: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  };

  render() {
    const { amazing, onClick } = this.props;
    return (
      <Label
        as="a"
        icon="trophy"
        content="Amazing"
        color={amazing ? "red" : null}
        onClick={onClick}
      />
    );
  }
}
