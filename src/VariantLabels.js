// @flow
import React from "react";
import { Label } from "semantic-ui-react";
import type {
  PokedexVariants,
  VariantsCaught,
  HandleVariantClick
} from "./types";

type Props = {
  pokemonId: string,
  variants: PokedexVariants,
  variantsCaught: VariantsCaught,
  onClick: HandleVariantClick
};

export default class VariantLabels extends React.PureComponent<Props> {
  variantContentMap = {
    ash: "Ash's Hat",
    party: "Party Hat",
    witch: "Witch Hat",
    santa: "Santa Hat"
  };

  userHasCaught = (variant: string) => {
    const { variantsCaught } = this.props;
    return Boolean(variantsCaught && variantsCaught[variant]);
  };

  getColor = (variant: string) =>
    this.userHasCaught(variant) ? "green" : undefined;

  handleClick = (variant: string) => () => {
    const { pokemonId, onClick } = this.props;
    const userHasCaught = this.userHasCaught(variant);
    onClick(pokemonId, variant, !userHasCaught);
  };

  render() {
    const { variants } = this.props;
    return (
      <div>
        {Object.keys(variants).map(variant => (
          <Label
            key={variant}
            as="a"
            icon="check circle"
            content={this.variantContentMap[variant]}
            color={this.getColor(variant)}
            onClick={this.handleClick(variant)}
            horizontal
          />
        ))}
      </div>
    );
  }
}
