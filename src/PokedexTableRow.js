// @flow
import React from "react";
import { Table } from "semantic-ui-react";
import LegacyLabel from "./LegacyLabel";
import GenderLabels from "./GenderLabels";
import type {
  Settings,
  Pokemon,
  Collected,
  HandleLegacyClick,
  HandleGenderClick
} from "./types";

type Props = {
  settings: Settings,
  pokemon: Pokemon,
  collected: Collected,
  onLegacyClick: HandleLegacyClick,
  onGenderClick: HandleGenderClick
};

export default class PokedexTableRow extends React.PureComponent<Props> {
  formatPokemonNumber = (number: number) =>
    `#${number.toString().padStart(3, "0")}`;

  render() {
    const {
      settings,
      pokemon: { id, number, name, genders, canBeShiny },
      collected,
      onLegacyClick,
      onGenderClick
    } = this.props;

    return (
      <Table.Row>
        <Table.Cell collapsing>
          {this.formatPokemonNumber(number)} {name}
        </Table.Cell>
        <Table.Cell style={{ lineHeight: "2em" }}>
          {settings.enableLegacyCatches && (
            <LegacyLabel
              pokemonId={id}
              legacyCaught={collected && collected.legacyCaught}
              onClick={onLegacyClick}
            />
          )}
          <GenderLabels
            pokemonId={id}
            genders={genders}
            canBeShiny={canBeShiny}
            gendersCaught={collected && collected.gendersCaught}
            onClick={onGenderClick}
          />
        </Table.Cell>
      </Table.Row>
    );
  }
}
