// @flow
import React from "react";
import { Table } from "semantic-ui-react";
import PokedexTableRow from "./PokedexTableRow";
import type { Pokemon } from "./types";

type Props = {
  pokedex: Array<Pokemon>
};

export default class PokedexTable extends React.Component<Props> {
  render() {
    return (
      <Table>
        <Table.Body>
          {this.props.pokedex.map(p => (
            <PokedexTableRow key={p.id} pokemon={p} />
          ))}
        </Table.Body>
      </Table>
    );
  }
}
