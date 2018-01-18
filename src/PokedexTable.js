// @flow
import React from "react";
import { Table } from "semantic-ui-react";
import { filters } from "./constants";
import PokedexTableRow from "./PokedexTableRow";
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
        const caughtSomeGender =
          "gendersCaught" in c && Object.values(c.gendersCaught).includes(true);

        const caughtSomeShiny =
          "shiniesCaught" in c && Object.values(c.shiniesCaught).includes(true);

        const caughtSomeForm =
          "formsCaught" in c && Object.values(c.formsCaught).includes(true);

        const caughtSomeVariant =
          "variantsCaught" in c &&
          Object.values(c.variantsCaught).includes(true);

        const caughtLegacy = enableLegacyCatches && c.legacyCaught;

        return (
          !caughtSomeGender &&
          !caughtSomeShiny &&
          !caughtSomeForm &&
          !caughtSomeVariant &&
          !caughtLegacy
        );
      } else if (filter === filters.UNCAUGHT_GFV) {
        const activeGenders = Object.keys(p.genders).filter(g => p.genders[g]);
        const missingGenders = activeGenders.some(
          g => !(c.gendersCaught && g in c.gendersCaught && c.gendersCaught[g])
        );
        const missingShinies =
          p.canBeShiny &&
          activeGenders.some(
            g =>
              !(c.shiniesCaught && g in c.shiniesCaught && c.shiniesCaught[g])
          );

        const activeForms = Object.keys(p.forms).filter(f => p.forms[f].active);
        const missingForms = activeForms.some(
          f => !(c.formsCaught && f in c.formsCaught && c.formsCaught[f])
        );

        const activeVariants = Object.keys(p.variants).filter(
          v => p.variants[v]
        );
        const missingVariants = activeVariants.some(
          v =>
            !(c.variantsCaught && v in c.variantsCaught && c.variantsCaught[v])
        );

        return (
          missingForms ||
          (activeForms.length === 0 && missingGenders) ||
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
