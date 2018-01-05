// @flow
import React from "react";
import { Table } from "semantic-ui-react";
import GenderLabels from "./GenderLabels";
import { formatPokemonNumber } from "./utils";
import type { Pokemon } from "./types";

type Props = {
  pokemon: Pokemon
};

export default class PokedexTableRow extends React.Component<Props> {
  render() {
    const { pokemon: { number, name, genders, canBeShiny } } = this.props;
    return (
      <Table.Row>
        <Table.Cell collapsing>
          {formatPokemonNumber(number)} {name}
        </Table.Cell>
        <Table.Cell>
          <GenderLabels genders={genders} canBeShiny={canBeShiny} />
        </Table.Cell>
      </Table.Row>
    );
  }
}
