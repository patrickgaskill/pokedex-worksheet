import React from "react";
import PropTypes from "prop-types";
import { Label } from "semantic-ui-react";
import { possibleGenders } from "./constants";
import { mapGenderToIcon, mapGenderToContent, mapGenderToColor } from "./utils";

export default class GenderLabel extends React.PureComponent {
  static propTypes = {
    gender: PropTypes.oneOf(possibleGenders).isRequired,
    caught: PropTypes.bool,
    onClick: PropTypes.func.isRequired
  };

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
