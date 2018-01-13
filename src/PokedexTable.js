// @flow
import React from "react";
import { Table } from "semantic-ui-react";
import PokedexTableRow from "./PokedexTableRow";
import type {
  Settings,
  Pokemon,
  Collection,
  HandleCollectionClick
} from "./types";

type Props = {
  settings: Settings,
  pokedex: Array<Pokemon>,
  collection: Collection,
  onClick: HandleCollectionClick
};

export default class PokedexTable extends React.Component<Props> {
  render() {
    const { settings, pokedex, collection, onClick } = this.props;
    return (
      <Table attached>
        <Table.Body>
          {pokedex.map(p => (
            <PokedexTableRow
              settings={settings}
              key={p.id}
              pokemon={p}
              collected={collection[p.id]}
              onClick={onClick}
            />
          ))}
        </Table.Body>
      </Table>
    );
  }
}
