import React from "react";
import PropTypes from "prop-types";
import { Label } from "semantic-ui-react";
import { possibleGenders } from "./constants";
import { mapGenderToIcon, mapGenderToContent, mapGenderToColor } from "./utils";

export default class GenderLabel extends React.Component {
  static propTypes = {
    gender: PropTypes.oneOf(possibleGenders).isRequired,
    caught: PropTypes.bool,
    onClick: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.gender !== this.props.gender) {
      return true;
    }

    if (nextProps.caught !== this.props.caught) {
      return true;
    }

    return false;
  }

  render() {
    const { gender, caught, onClick } = this.props;
    return (
      <Label
        as="a"
        icon={mapGenderToIcon(gender)}
        content={mapGenderToContent(gender)}
        color={caught ? mapGenderToColor(gender) : null}
        onClick={onClick}
      />
    );
  }
}
