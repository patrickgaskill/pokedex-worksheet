import React from "react";
import PropTypes from "prop-types";
import { Label } from "semantic-ui-react";

export default class AmazingLabel extends React.Component {
  static propTypes = {
    amazing: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.amazing !== this.props.amazing) {
      return true;
    }

    return false;
  }

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
