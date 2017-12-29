import React from "react";
import PropTypes from "prop-types";
import { Table, Label } from "semantic-ui-react";
import SeenLabel from "./SeenLabel";
import AmazingLabel from "./AmazingLabel";
import GenderLabel from "./GenderLabel";
import VariantLabel from "./VariantLabel";
import RegionalRibbon from "./RegionalRibbon";
import LegendaryRibbon from "./LegendaryRibbon";
import { pokedexEntryPropType, collectionEntryPropType } from "./constants";
import { formatPokemonNumber } from "./utils";

export default class PokedexTableRow extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    pokedexEntry: pokedexEntryPropType.isRequired,
    collectionEntry: collectionEntryPropType,
    onSeenClick: PropTypes.func.isRequired,
    onAmazingClick: PropTypes.func.isRequired,
    onGenderClick: PropTypes.func.isRequired,
    onVariantClick: PropTypes.func.isRequired
  };

  render() {
    const {
      id,
      pokedexEntry: {
        name,
        genders,
        variants,
        isRegional,
        isLegendary,
        evolutions
      },
      onSeenClick,
      onAmazingClick,
      onGenderClick,
      onVariantClick
    } = this.props;

    const collectionEntry = {
      isSeen: false,
      hasAmazing: false,
      gendersCaught: {},
      variantsCaught: {},
      ...this.props.collectionEntry
    };

    return (
      <Table.Row>
        <Table.Cell>
          {isRegional && <RegionalRibbon />}
          {isLegendary && <LegendaryRibbon />}
          {formatPokemonNumber(id)} {name}
        </Table.Cell>
        <Table.Cell>
          <Label.Group>
            <SeenLabel seen={collectionEntry.isSeen} onClick={onSeenClick} />
            {genders.map(g => (
              <GenderLabel
                key={g}
                gender={g}
                caught={collectionEntry.gendersCaught[g]}
                onClick={onGenderClick(g)}
              />
            ))}
            {variants.map(v => (
              <VariantLabel
                key={v}
                variant={v}
                caught={collectionEntry.variantsCaught[v]}
                onClick={onVariantClick(v)}
              />
            ))}
            {Object.keys(evolutions).length === 0 && (
              <AmazingLabel
                amazing={collectionEntry.hasAmazing}
                onClick={onAmazingClick}
              />
            )}
          </Label.Group>
        </Table.Cell>
      </Table.Row>
    );
  }
}
