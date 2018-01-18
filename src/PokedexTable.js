// @flow
import React from "react";
import { Table } from "semantic-ui-react";
import PokedexTableRow from "./PokedexTableRow";
import { filters } from "./constants";
import { hasTrueValue, hasKeys } from "./utils";
import type {
  Settings,
  Pokedex,
  Collection,
  HandleCollectionClick
} from "./types";

type Props = {
  settings: Settings,
  pokedex: Pokedex,
  collection: Collection,
  onClick: HandleCollectionClick
};

export default class PokedexTable extends React.Component<Props> {
  getFilteredPokedex = () => {
    const {
      settings: { filter, enableLegacyCatches },
      pokedex,
      collection
    } = this.props;
    return pokedex.filter(p => {
      if (!collection || !collection[p.id]) return true;

      const c = collection[p.id];
      if (filter === filters.UNCAUGHT) {
        const caughtSomeGender = hasTrueValue(c.gendersCaught);
        const caughtSomeShiny = hasTrueValue(c.shiniesCaught);
        const caughtSomeForm = hasTrueValue(c.formsCaught);
        const caughtSomeVariant = hasTrueValue(c.variantsCaught);
        const caughtLegacy = enableLegacyCatches && c.legacyCaught;
        return (
          !caughtSomeGender &&
          !caughtSomeShiny &&
          !caughtSomeForm &&
          !caughtSomeVariant &&
          !caughtLegacy
        );
      } else if (filter === filters.UNCAUGHT_GFV) {
        const missingGenders = Object.keys(p.genders).some(
          g => p.genders[g] && !(c.gendersCaught && c.gendersCaught[g])
        );
        const missingShinies = Object.keys(p.genders).some(
          g =>
            p.canBeShiny &&
            p.genders[g] &&
            !(c.shiniesCaught && c.shiniesCaught[g])
        );
        const missingForms = Object.keys(p.forms).some(
          f => p.forms[f].active && !(c.formsCaught && c.formsCaught[f])
        );
        const missingVariants = Object.keys(p.variants).some(
          v => p.variants[v] && !(c.variantsCaught && c.variantsCaught[v])
        );
        return (
          missingForms ||
          (!hasKeys(p.forms) && missingGenders) ||
          missingShinies ||
          missingVariants
        );
      }

      return true;
    });
  };

  render() {
    const {
      settings: { enableLegacyCatches },
      collection,
      onClick
    } = this.props;
    return (
      <Table attached>
        <Table.Body>
          {this.getFilteredPokedex().map(p => (
            <PokedexTableRow
              key={p.id}
              pokemon={p}
              collected={collection[p.id]}
              enableLegacyCatches={enableLegacyCatches}
              onClick={onClick}
            />
          ))}
        </Table.Body>
      </Table>
    );
  }
}
