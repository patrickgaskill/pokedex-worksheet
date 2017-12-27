import React from "react";
import PropTypes from "prop-types";
import { Label } from "semantic-ui-react";
import { possibleVariants } from "./constants";
import { mapVariantToContent } from "./utils";

export default class VariantLabel extends React.Component {
  static propTypes = {
    variant: PropTypes.oneOf(possibleVariants).isRequired,
    caught: PropTypes.bool,
    onClick: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.variant !== this.props.variant) {
      return true;
    }

    if (nextProps.caught !== this.props.caught) {
      return true;
    }

    return false;
  }

  render() {
    const { variant, caught, onClick } = this.props;
    return (
      <Label
        as="a"
        icon="check"
        content={mapVariantToContent(variant)}
        color={caught ? "green" : null}
        onClick={onClick}
      />
    );
  }
}
