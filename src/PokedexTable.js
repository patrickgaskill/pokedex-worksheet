// @flow
import React from "react";
import { Table } from "semantic-ui-react";
import PokedexTableRow from "./PokedexTableRow";
import type {
  Settings,
  Pokemon,
  Collection,
  HandleLegacyClick,
  HandleGenderClick,
  HandleFormClick,
  HandleVariantClick
} from "./types";

type Props = {
  settings: Settings,
  pokedex: Array<Pokemon>,
  collection: Collection,
  onLegacyClick: HandleLegacyClick,
  onGenderClick: HandleGenderClick,
  onFormClick: HandleFormClick,
  onVariantClick: HandleVariantClick
};

export default class PokedexTable extends React.Component<Props> {
  render() {
    const {
      settings,
      pokedex,
      collection,
      onLegacyClick,
      onGenderClick,
      onFormClick,
      onVariantClick
    } = this.props;
    return (
      <Table attached>
        <Table.Body>
          {pokedex.map(p => (
            <PokedexTableRow
              settings={settings}
              key={p.id}
              pokemon={p}
              collected={collection[p.id]}
              onLegacyClick={onLegacyClick}
              onGenderClick={onGenderClick}
              onFormClick={onFormClick}
              onVariantClick={onVariantClick}
            />
          ))}
        </Table.Body>
      </Table>
    );
  }
}
