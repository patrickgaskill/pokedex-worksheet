// @flow
import React from "react";
import classNames from "classnames";
import { Table } from "semantic-ui-react";
import LegacyLabel from "./LegacyLabel";
import GenderLabels from "./GenderLabels";
import FormLabels from "./FormLabels";
import VariantLabels from "./VariantLabels";
import { formatPokemonNumber } from "./utils";
import type { Pokemon, Collected, HandleCollectionClick } from "./types";

type Props = {
  pokemon: Pokemon,
  collected: Collected,
  onClick: HandleCollectionClick,
  enableLegacyCatches: boolean
};

export default class PokedexTableRow extends React.PureComponent<Props> {
  hasForms = () => Object.keys(this.props.pokemon.forms).length > 0;

  hasVariants = () => Object.keys(this.props.pokemon.variants).length > 0;

  render() {
    const {
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
      enableLegacyCatches,
      onClick
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
          {formatPokemonNumber(number)} {name}
        </Table.Cell>
        <Table.Cell style={{ lineHeight: "2em" }}>
          {enableLegacyCatches && (
            <LegacyLabel
              pokemonId={id}
              legacyCaught={collected && collected.legacyCaught}
              onClick={onClick}
            />
          )}
          {this.hasForms() ? (
            <FormLabels
              pokemonId={id}
              forms={forms}
              formsCaught={collected && collected.formsCaught}
              onClick={onClick}
            />
          ) : (
            <GenderLabels
              pokemonId={id}
              genders={genders}
              canBeShiny={canBeShiny}
              gendersCaught={collected && collected.gendersCaught}
              shiniesCaught={collected && collected.shiniesCaught}
              onClick={onClick}
            />
          )}
          {this.hasVariants() && (
            <VariantLabels
              pokemonId={id}
              variants={variants}
              variantsCaught={collected && collected.variantsCaught}
              onClick={onClick}
            />
          )}
        </Table.Cell>
      </Table.Row>
    );
  }
}
