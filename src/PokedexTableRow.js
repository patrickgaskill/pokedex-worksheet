// @flow
import React from "react";
import { Table } from "semantic-ui-react";
import GenderLabels from "./GenderLabels";
import type { Pokemon, Collected, HandleGenderClickWithId } from "./types";

type Props = {
  pokemon: Pokemon,
  collected: Collected,
  onGenderClick: HandleGenderClickWithId
};

export default class PokedexTableRow extends React.PureComponent<Props> {
  formatPokemonNumber = (number: number) =>
    `#${number.toString().padStart(3, "0")}`;

  render() {
    const {
      pokemon: { id, number, name, genders, canBeShiny },
      collected,
      onGenderClick
    } = this.props;

    return (
      <Table.Row>
        <Table.Cell collapsing>
          {this.formatPokemonNumber(number)} {name}
        </Table.Cell>
        <Table.Cell>
          <GenderLabels
            genders={genders}
            canBeShiny={canBeShiny}
            gendersCaught={collected && collected.gendersCaught}
            onClick={onGenderClick(id)}
          />
        </Table.Cell>
      </Table.Row>
    );
  }
}
