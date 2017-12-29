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

export default class PokedexTableRow extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    pokedexEntry: pokedexEntryPropType.isRequired,
    collectionEntry: collectionEntryPropType,
    onSeenClick: PropTypes.func.isRequired,
    onAmazingClick: PropTypes.func.isRequired,
    onGenderClick: PropTypes.func.isRequired,
    onVariantClick: PropTypes.func.isRequired
  };

  handleSeenClick = () => {
    const { id, onSeenClick } = this.props;
    onSeenClick(id);
  };

  handleAmazingClick = () => {
    const { id, onAmazingClick } = this.props;
    onAmazingClick(id);
  };

  handleGenderClick = gender => () => {
    const { id, onGenderClick } = this.props;
    onGenderClick(id, gender);
  };

  handleVariantClick = variant => () => {
    const { id, onVariantClick } = this.props;
    onVariantClick(id, variant);
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
      collectionEntry
    } = this.props;

    const mergedEntry = {
      isSeen: false,
      hasAmazing: false,
      gendersCaught: {},
      variantsCaught: {},
      ...collectionEntry
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
            <SeenLabel
              isSeen={mergedEntry.isSeen}
              onClick={this.handleSeenClick}
            />
            {genders.map(g => (
              <GenderLabel
                key={g}
                gender={g}
                isCaught={mergedEntry.gendersCaught[g]}
                onClick={this.handleGenderClick(g)}
              />
            ))}
            {variants.map(v => (
              <VariantLabel
                key={v}
                variant={v}
                isCaught={mergedEntry.variantsCaught[v]}
                onClick={this.handleVariantClick(v)}
              />
            ))}
            {Object.keys(evolutions).length === 0 && (
              <AmazingLabel
                hasAmazing={mergedEntry.hasAmazing}
                onClick={this.handleAmazingClick}
              />
            )}
          </Label.Group>
        </Table.Cell>
      </Table.Row>
    );
  }
}
