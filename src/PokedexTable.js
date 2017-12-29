// @flow
import React from "react";
import { Table } from "semantic-ui-react";
import PokedexTableRow from "./PokedexTableRow";
import type {
  PokemonId,
  Pokedex,
  Collection,
  Gender,
  Variant
} from "./constants";

type Props = {
  visibleIds: Array<PokemonId>,
  pokedex: Pokedex,
  collection: Collection,
  onSeenClick: PokemonId => void,
  onAmazingClick: PokemonId => void,
  onGenderClick: (PokemonId, Gender) => void,
  onVariantClick: (PokemonId, Variant) => void
};

export default class PokedexTable extends React.PureComponent<Props> {
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
              onSeenClick={onSeenClick}
              onAmazingClick={onAmazingClick}
              onGenderClick={onGenderClick}
              onVariantClick={onVariantClick}
            />
          ))}
        </Table.Body>
      </Table>
    );
  }
}
