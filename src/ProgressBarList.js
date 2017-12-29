import React from "react";
import { List } from "semantic-ui-react";
import ProgressBarListItem from "./ProgressBarListItem";
import { pokedexPropType, collectionPropType } from "./constants";
import { hasEvolutions } from "./utils";

export default class ProgressBarList extends React.PureComponent {
  static propTypes = {
    pokedex: pokedexPropType.isRequired,
    collection: collectionPropType.isRequired
  };

  render() {
    const { collection, pokedex } = this.props;
    const pokedexKeys = Object.keys(pokedex);
    const pokedexTotal = pokedexKeys.length;

    let seenCount = 0;
    let caughtCount = 0;
    let gendersAndVariantsCount = 0;
    let gendersAndVariantsTotal = 0;
    let amazingCount = 0;
    let amazingTotal = 0;

    pokedexKeys.forEach(id => {
      const p = pokedex[id];
      const c = collection[id];
      const trueGenders = Object.values(c.gendersCaught).filter(g => g);
      const trueVariants = Object.values(c.variantsCaught).filter(v => v);

      if (c.isSeen) seenCount++;
      if (trueGenders.length > 0) caughtCount++;

      gendersAndVariantsCount += trueGenders.length + trueVariants.length;
      gendersAndVariantsTotal += p.genders.length + p.variants.length;

      if (!hasEvolutions(p.evolutions)) {
        amazingTotal++;
        if (c.hasAmazing) amazingCount++;
      }
    });

    return (
      <List>
        <ProgressBarListItem
          label="Seen"
          value={seenCount}
          total={pokedexTotal}
        />
        <ProgressBarListItem
          label="Caught"
          value={caughtCount}
          total={pokedexTotal}
        />
        <ProgressBarListItem
          label="Genders & variants"
          value={gendersAndVariantsCount}
          total={gendersAndVariantsTotal}
        />
        <ProgressBarListItem
          label="Amazing final evolutions"
          value={amazingCount}
          total={amazingTotal}
        />
      </List>
    );
  }
}
