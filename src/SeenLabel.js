// @flow
import React from "react";
import { Label } from "semantic-ui-react";
import type { PokemonId } from "./constants";

type Props = {
  isSeen: boolean,
  onClick: PokemonId => void
};

export default class SeenLabel extends React.PureComponent<Props> {
  render() {
    const { isSeen, onClick } = this.props;
    return (
      <Label
        as="a"
        icon="eye"
        content="Seen"
        color={isSeen ? "purple" : null}
        onClick={onClick}
      />
    );
  }
}
