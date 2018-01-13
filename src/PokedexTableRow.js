// @flow
import React from "react";
import classNames from "classnames";
import { Table } from "semantic-ui-react";
import LegacyLabel from "./LegacyLabel";
import GenderLabels from "./GenderLabels";
import FormLabels from "./FormLabels";
import VariantLabels from "./VariantLabels";
import type {
  Settings,
  Pokemon,
  Collected,
  HandleLegacyClick,
  HandleGenderClick,
  HandleFormClick,
  HandleVariantClick
} from "./types";

type Props = {
  settings: Settings,
  pokemon: Pokemon,
  collected: Collected,
  onLegacyClick: HandleLegacyClick,
  onGenderClick: HandleGenderClick,
  onFormClick: HandleFormClick,
  onVariantClick: HandleVariantClick
};

export default class PokedexTableRow extends React.PureComponent<Props> {
  formatPokemonNumber = (number: number) =>
    `#${number.toString().padStart(3, "0")}`;

  hasForms = () => Object.keys(this.props.pokemon.forms).length > 0;

  hasVariants = () => Object.keys(this.props.pokemon.variants).length > 0;

  render() {
    const {
      settings,
      pokemon: {
        id,
        number,
        name,
        genders,
        forms,
        variants,
        canBeShiny,
        isRegional,
        rarity
      },
      collected,
      onLegacyClick,
      onGenderClick,
      onFormClick,
      onVariantClick
    } = this.props;

    return (
      <Table.Row
        className={classNames({
          regional: isRegional,
          legendary: rarity === "POKEMON_RARITY_LEGENDARY",
          mythic: rarity === "POKEMON_RARITY_MYTHIC"
        })}
      >
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
          {this.hasForms() ? (
            <FormLabels
              pokemonId={id}
              forms={forms}
              formsCaught={collected && collected.formsCaught}
              onClick={onFormClick}
            />
          ) : (
            <GenderLabels
              pokemonId={id}
              genders={genders}
              canBeShiny={canBeShiny}
              gendersCaught={collected && collected.gendersCaught}
              onClick={onGenderClick}
            />
          )}
          {this.hasVariants() && (
            <VariantLabels
              pokemonId={id}
              variants={variants}
              variantsCaught={collected && collected.variantsCaught}
              onClick={onVariantClick}
            />
          )}
        </Table.Cell>
      </Table.Row>
    );
  }
}
