// @flow
import React from "react";
import { HandleLegacyClick, Label } from "semantic-ui-react";

type Props = {
  pokemonId: string,
  legacyCaught?: boolean,
  onClick: HandleLegacyClick
};

export default class LegacyLabel extends React.PureComponent<Props> {
  handleClick = () => {
    const { pokemonId, legacyCaught, onClick } = this.props;
    onClick(pokemonId, !legacyCaught);
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
