import React from "react";
import PropTypes from "prop-types";
import { Label } from "semantic-ui-react";

export default class SeenLabel extends React.PureComponent {
  static propTypes = {
    seen: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  };

  render() {
    const { seen, onClick } = this.props;
    return (
      <Label
        as="a"
        icon="eye"
        content="Seen"
        color={seen ? "purple" : null}
        onClick={onClick}
      />
    );
  }
}
