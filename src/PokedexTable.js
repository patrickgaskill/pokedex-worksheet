import React from "react";
import PropTypes from "prop-types";
import { Table } from "semantic-ui-react";
import PokedexTableRow from "./PokedexTableRow";
import { pokemonPropTypes } from "./constants";

export default class PokedexTable extends React.Component {
  static propTypes = {
    pokedex: PropTypes.arrayOf(pokemonPropTypes).isRequired,
    onSeenClick: PropTypes.func.isRequired,
    onAmazingClick: PropTypes.func.isRequired,
    onGenderClick: PropTypes.func.isRequired,
    onVariantClick: PropTypes.func.isRequired
  };

  render() {
    const {
      pokedex,
      onSeenClick,
      onAmazingClick,
      onGenderClick,
      onVariantClick
    } = this.props;
    return (
      <Table celled striped>
        <Table.Body>
          {pokedex.map(p => (
            <PokedexTableRow
              key={p.id}
              pokemon={p}
              onSeenClick={onSeenClick(p.id)}
              onAmazingClick={onAmazingClick(p.id)}
              onGenderClick={onGenderClick(p.id)}
              onVariantClick={onVariantClick(p.id)}
            />
          ))}
        </Table.Body>
      </Table>
    );
  }
}
