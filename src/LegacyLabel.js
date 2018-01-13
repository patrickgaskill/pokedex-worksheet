// @flow
import React from "react";
import { Label } from "semantic-ui-react";
import type { HandleCollectionClick } from "./types";

type Props = {
  pokemonId: string,
  legacyCaught?: boolean,
  onClick: HandleCollectionClick
};

export default class LegacyLabel extends React.PureComponent<Props> {
  handleClick = () => {
    const { pokemonId, legacyCaught, onClick } = this.props;
    onClick(pokemonId, { legacyCaught: !legacyCaught });
  };

  render() {
    return (
      <Label
        as="a"
        content="Caught"
        icon="check circle"
        color={this.props.legacyCaught ? "purple" : undefined}
        horizontal
        onClick={this.handleClick}
      />
    );
  }
}
