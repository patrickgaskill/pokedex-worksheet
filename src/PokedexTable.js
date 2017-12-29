import React from "react";
import PropTypes from "prop-types";
import { Table } from "semantic-ui-react";
import PokedexTableRow from "./PokedexTableRow";
import { pokedexPropType, collectionPropType } from "./constants";

export default class PokedexTable extends React.PureComponent {
  static propTypes = {
    visibleIds: PropTypes.arrayOf(PropTypes.string),
    pokedex: pokedexPropType.isRequired,
    collection: collectionPropType.isRequired,
    onSeenClick: PropTypes.func.isRequired,
    onAmazingClick: PropTypes.func.isRequired,
    onGenderClick: PropTypes.func.isRequired,
    onVariantClick: PropTypes.func.isRequired
  };

  render() {
    const {
      visibleIds,
      pokedex,
      collection,
      onSeenClick,
      onAmazingClick,
      onGenderClick,
      onVariantClick
    } = this.props;
    return (
      <Table celled striped>
        <Table.Body>
          {visibleIds.map(id => (
            <PokedexTableRow
              key={id}
              id={id}
              pokedexEntry={pokedex[id]}
              collectionEntry={collection[id]}
              onSeenClick={onSeenClick(id)}
              onAmazingClick={onAmazingClick(id)}
              onGenderClick={onGenderClick(id)}
              onVariantClick={onVariantClick(id)}
            />
          ))}
        </Table.Body>
      </Table>
    );
  }
}
