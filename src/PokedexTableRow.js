// @flow
import React from "react";
import { Table } from "semantic-ui-react";
import LegacyLabel from "./LegacyLabel";
import GenderLabels from "./GenderLabels";
import FormLabels from "./FormLabels";
import VariantLabels from "./VariantLabels";
import { rarities } from "./constants";
import { formatPokemonNumber, hasKeys } from "./utils";
import type { Pokemon, Collected, HandleCollectionClick } from "./types";

type Props = {
  pokemon: Pokemon,
  collected: Collected,
  onClick: HandleCollectionClick,
  enableLegacyCatches: boolean
};

export default class PokedexTableRow extends React.PureComponent<Props> {
  getClassName = () => {
    const { isRegional, rarity } = this.props.pokemon;
    if (rarity === rarities.MYTHIC) return "mythic";
    if (rarity === rarities.LEGENDARY) return "legendary";
    if (isRegional) return "regional";
    return null;
  };

  render() {
    const {
      pokemon: { id, number, name, genders, forms, variants, canBeShiny },
      collected,
      enableLegacyCatches,
      onClick
    } = this.props;

    return (
      <Table.Row className={this.getClassName()}>
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
          {hasKeys(forms) ? (
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
          {hasKeys(variants) && (
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
