import React from "react";
import PropTypes from "prop-types";
import { Label } from "semantic-ui-react";

export default class AmazingLabel extends React.PureComponent {
  static propTypes = {
    hasAmazing: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  };

  render() {
    const { hasAmazing, onClick } = this.props;
    return (
      <Label
        as="a"
        icon="trophy"
        content="Amazing"
        color={hasAmazing ? "red" : null}
        onClick={onClick}
      />
    );
  }
}
