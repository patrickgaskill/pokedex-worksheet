import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { genderColors, possibleGenders } from "./constants";

export default class GenderIcon extends React.PureComponent {
  static propTypes = {
    gender: PropTypes.oneOf(possibleGenders).isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired
  };

  mapGenderToColor = () => {
    switch (this.props.gender) {
      case "male":
      case "maleShiny":
        return genderColors.male;
      case "female":
      case "femaleShiny":
        return genderColors.female;
      case "genderless":
      case "genderlessShiny":
        return genderColors.genderless;
      default:
        return genderColors.unown;
    }
  };

  mapGenderToIcon = () => {
    switch (this.props.gender) {
      case "male":
      case "maleShiny":
        return "fa-mars";
      case "female":
      case "femaleShiny":
        return "fa-venus";
      case "genderless":
        return "fa-genderless";
      default:
        return null;
    }
  };

  isShiny = () => {
    switch (this.props.gender) {
      case "maleShiny":
      case "femaleShiny":
      case "genderlessShiny":
        return true;
      default:
        return false;
    }
  };

  isUnown = () => {
    switch (this.props.gender) {
      case "male":
      case "maleShiny":
      case "female":
      case "femaleShiny":
      case "genderless":
      case "genderlessShiny":
        return false;
      default:
        return true;
    }
  };

  renderShinyIcon = () => (
    <span
      style={{
        color: this.props.disabled ? genderColors.disabled : genderColors.shiny
      }}
    >
      <i
        className="fas fa-circle"
        data-fa-transform="shrink-6 right-6 down-6"
      />
      <i
        className="fas fa-inverse fa-star"
        data-fa-transform="shrink-11 right-6 down-6"
      />
    </span>
  );

  render() {
    const { gender, disabled, onClick } = this.props;
    return (
      <span
        className="fa-layers fa-fw fa-lg"
        style={{
          color: disabled ? genderColors.disabled : this.mapGenderToColor(),
          cursor: "pointer"
        }}
        onClick={onClick}
      >
        <i className="fas fa-circle" />
        {this.isUnown() ? (
          <span
            className="fa-layers-text fa-inverse"
            data-fa-transform="shrink-6"
          >
            {gender.toUpperCase()}
          </span>
        ) : (
          <i
            className={classNames("fas", "fa-inverse", this.mapGenderToIcon())}
            data-fa-transform="shrink-4 left-0.5"
          />
        )}
        {this.isShiny() && this.renderShinyIcon()}
      </span>
    );
  }
}
