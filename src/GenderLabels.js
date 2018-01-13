// @flow
import React from "react";
import { Label } from "semantic-ui-react";
import type {
  PokedexGenders,
  GendersCaught,
  Gender,
  HandleCollectionClick
} from "./types";

type Props = {
  pokemonId: string,
  genders: PokedexGenders,
  canBeShiny: boolean,
  gendersCaught?: GendersCaught,
  onClick: HandleCollectionClick
};

export default class GenderLabels extends React.PureComponent<Props> {
  genderMap = {
    male: {
      content: "Male",
      icon: "mars",
      color: "blue"
    },
    female: {
      content: "Female",
      icon: "venus",
      color: "pink"
    },
    genderless: {
      content: "Genderless",
      icon: "genderless",
      color: "grey"
    }
  };

  userHasCaught = (gender: Gender, forShiny: boolean) => {
    const { gendersCaught } = this.props;
    const shinyKey = forShiny ? "shiny" : "normal";
    return Boolean(
      gendersCaught &&
        gender in gendersCaught &&
        gendersCaught[gender][shinyKey]
    );
  };

  getColor = (gender: Gender, forShiny: boolean) =>
    this.userHasCaught(gender, forShiny)
      ? this.genderMap[gender].color
      : undefined;

  handleClick = (gender: Gender, forShiny: boolean) => () => {
    const { pokemonId, onClick } = this.props;
    const shinyKey = forShiny ? "shiny" : "normal";
    const userHasCaught = this.userHasCaught(gender, forShiny);
    onClick(pokemonId, {
      gendersCaught: { [gender]: { [shinyKey]: !userHasCaught } }
    });
  };

  render() {
    return (
      <span>
        {Object.keys(this.genderMap).map(g => {
          return (
            this.props.genders[g] && (
              <span key={g}>
                <Label
                  as="a"
                  content={this.genderMap[g].content}
                  color={this.getColor(g, false)}
                  icon={this.genderMap[g].icon}
                  onClick={this.handleClick(g, false)}
                  horizontal
                />
                {this.props.canBeShiny && (
                  <Label
                    as="a"
                    content={`${this.genderMap[g].content} Shiny`}
                    color={this.getColor(g, true)}
                    icon={this.genderMap[g].icon}
                    onClick={this.handleClick(g, true)}
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
