// @flow
import React from "react";
import { Label } from "semantic-ui-react";
import type { Genders } from "./types";

type Props = {
  genders: Genders,
  canBeShiny: boolean
};

export default class GenderLabels extends React.Component<Props> {
  hasGender = (gender: string) => this.props.genders.hasOwnProperty(gender);

  mapGenderToContent = (gender: string) =>
    ({ male: "Male", female: "Female", genderless: "Genderless" }[gender]);

  mapGenderToIcon = (gender: string) =>
    ({ male: "mars", female: "venus", genderless: "genderless" }[gender]);

  render() {
    const { canBeShiny } = this.props;
    const possibleGenders = ["male", "female", "genderless"];
    return (
      <span>
        {possibleGenders.map(g => {
          return (
            this.hasGender(g) && (
              <span key={g}>
                <Label
                  as="a"
                  content={this.mapGenderToContent(g)}
                  icon={this.mapGenderToIcon(g)}
                  horizontal
                />
                {canBeShiny && (
                  <Label
                    as="a"
                    content={`${this.mapGenderToContent(g)} Shiny`}
                    icon={this.mapGenderToIcon(g)}
                    horizontal
                  />
                )}
              </span>
            )
          );
        })}
      </span>
    );
  }
}
