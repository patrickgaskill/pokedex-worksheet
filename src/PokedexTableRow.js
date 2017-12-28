import React from "react";
import PropTypes from "prop-types";
import { Table, Label } from "semantic-ui-react";
import SeenLabel from "./SeenLabel";
import AmazingLabel from "./AmazingLabel";
import GenderLabel from "./GenderLabel";
import VariantLabel from "./VariantLabel";
import RegionalRibbon from "./RegionalRibbon";
import LegendaryRibbon from "./LegendaryRibbon";
import { pokemonPropTypes } from "./constants";
import { formatPokemonNumber } from "./utils";

export default class PokedexTableRow extends React.Component {
  static propTypes = {
    pokemon: pokemonPropTypes.isRequired,
    onSeenClick: PropTypes.func.isRequired,
    onAmazingClick: PropTypes.func.isRequired,
    onGenderClick: PropTypes.func.isRequired,
    onVariantClick: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.pokemon.seen !== this.props.pokemon.seen) {
      return true;
    }

    if (nextProps.pokemon.amazing !== this.props.pokemon.amazing) {
      return true;
    }

    for (const g of Object.keys(nextProps.pokemon.genders)) {
      if (nextProps.pokemon.genders[g] !== this.props.pokemon.genders[g]) {
        return true;
      }
    }

    if (nextProps.pokemon.variants) {
      for (const v of Object.keys(nextProps.pokemon.variants)) {
        if (nextProps.pokemon.variants[v] !== this.props.pokemon.variants[v]) {
          return true;
        }
      }
    }

    return false;
  }

  render() {
    const {
      pokemon: {
        id,
        name,
        seen,
        amazing,
        regional,
        legendary,
        genders,
        variants,
        evolvesInto
      },
      onSeenClick,
      onAmazingClick,
      onGenderClick,
      onVariantClick
    } = this.props;
    return (
      <Table.Row>
        <Table.Cell>
          {regional && <RegionalRibbon />}
          {legendary && <LegendaryRibbon />}
          {formatPokemonNumber(id)} {name}
        </Table.Cell>
        <Table.Cell>
          <Label.Group>
            <SeenLabel seen={seen} onClick={onSeenClick} />
            {Object.keys(genders).map(g => (
              <GenderLabel
                key={g}
                gender={g}
                caught={genders[g]}
                onClick={onGenderClick(g)}
              />
            ))}
            {variants &&
              Object.keys(variants).map(v => (
                <VariantLabel
                  key={v}
                  variant={v}
                  caught={variants[v]}
                  onClick={onVariantClick(v)}
                />
              ))}
            {!evolvesInto && (
              <AmazingLabel amazing={amazing} onClick={onAmazingClick} />
            )}
          </Label.Group>
        </Table.Cell>
      </Table.Row>
    );
  }
}
