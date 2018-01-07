// @flow
import React from "react";
import { Table } from "semantic-ui-react";
import PokedexTableRow from "./PokedexTableRow";
import type { Pokemon, Collection, HandleGenderClickWithId } from "./types";

type Props = {
  pokedex: Array<Pokemon>,
  collection: Collection,
  onGenderClick: HandleGenderClickWithId
};

export default class PokedexTable extends React.Component<Props> {
  render() {
    const { pokedex, collection, onGenderClick } = this.props;
    return (
      <Table>
        <Table.Body>
          {pokedex.map(p => (
            <PokedexTableRow
              key={p.id}
              pokemon={p}
              collected={collection[p.id]}
              onGenderClick={onGenderClick}
            />
          ))}
        </Table.Body>
      </Table>
    );
  }
}
