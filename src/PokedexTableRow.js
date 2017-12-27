import React from "react";
import PropTypes from "prop-types";
import { Table, Label } from "semantic-ui-react";
import SeenLabel from "./SeenLabel";
import AmazingLabel from "./AmazingLabel";
import GenderLabel from "./GenderLabel";
import VariantLabel from "./VariantLabel";
import { genderPropTypes, variantPropTypes } from "./constants";
import { formatPokemonNumber } from "./utils";

export default class PokedexTableRow extends React.Component {
  static propTypes = {
    pokemon: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      seen: PropTypes.bool.isRequired,
      amazing: PropTypes.bool.isRequired,
      regional: PropTypes.bool,
      legendary: PropTypes.bool,
      genders: PropTypes.shape(genderPropTypes).isRequired,
      variants: PropTypes.shape(variantPropTypes)
    }).isRequired,
    onSeenClick: PropTypes.func.isRequired,
    onAmazingClick: PropTypes.func.isRequired,
    onGenderClick: PropTypes.func.isRequired,
    onVariantClick: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.pokemon !== this.props.pokemon) {
      return true;
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
        variants
      },
      onSeenClick,
      onAmazingClick,
      onGenderClick,
      onVariantClick
    } = this.props;
    return (
      <Table.Row>
        <Table.Cell>
          {regional && (
            <Label color="green" ribbon>
              Regional
            </Label>
          )}
          {legendary && (
            <Label color="orange" ribbon>
              Legendary
            </Label>
          )}
          {formatPokemonNumber(id)}
        </Table.Cell>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>
          <Label.Group>
            <SeenLabel seen={seen} onClick={onSeenClick} />
            <AmazingLabel amazing={amazing} onClick={onAmazingClick} />
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
          </Label.Group>
        </Table.Cell>
      </Table.Row>
    );
  }
}