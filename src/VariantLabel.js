// @flow
import React from "react";
import { Label } from "semantic-ui-react";
import { mapVariantToContent } from "./utils";
import type { PokemonId, Variant } from "./constants";

type Props = {
  variant: Variant,
  isCaught: boolean,
  onClick: (PokemonId, Variant) => void
};

export default class VariantLabel extends React.PureComponent<Props> {
  render() {
    const { variant, isCaught, onClick } = this.props;
    return (
      <Label
        as="a"
        icon="check"
        content={mapVariantToContent(variant)}
        color={isCaught ? "green" : null}
        onClick={onClick}
      />
    );
  }
}
