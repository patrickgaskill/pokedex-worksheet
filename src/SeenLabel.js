import React from "react";
import PropTypes from "prop-types";
import { Label } from "semantic-ui-react";

export default class SeenLabel extends React.PureComponent {
  static propTypes = {
    isSeen: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  };

  render() {
    const { isSeen, onClick } = this.props;
    return (
      <Label
        as="a"
        icon="eye"
        content="Seen"
        color={isSeen ? "purple" : null}
        onClick={onClick}
      />
    );
  }
}
