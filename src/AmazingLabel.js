// @flow
import React from "react";
import { Label } from "semantic-ui-react";
import type { PokemonId } from "./constants";

type Props = {
  hasAmazing: boolean,
  onClick: PokemonId => void
};

export default class AmazingLabel extends React.PureComponent<Props> {
  render() {
    const { hasAmazing, onClick } = this.props;
    return (
      <Label
        as="a"
        icon="trophy"
        content="Amazing"
        color={hasAmazing ? "red" : null}
        onClick={onClick}
      />
    );
  }
}
