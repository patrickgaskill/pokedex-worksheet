import React from "react";
import { List } from "semantic-ui-react";
import ProgressBarListItem from "./ProgressBarListItem";
import { pokedexPropType, collectionPropType } from "./constants";

export default class ProgressBarList extends React.PureComponent {
  static propTypes = {
    pokedex: pokedexPropType.isRequired,
    collection: collectionPropType.isRequired
  };

  render() {
    const { collection, pokedex } = this.props;
    const collectionValues = Object.values(collection);
    const pokedexKeys = Object.keys(pokedex);
    const pokedexTotal = pokedexKeys.length;

    const seenCount = collectionValues.filter(c => c.isSeen).length;

    const caughtCount = collectionValues.filter(
      c => c.gendersCaught && Object.values(c.gendersCaught).includes(true)
    ).length;

    const gendersAndVariantsCount = collectionValues.reduce(
      (total, c) =>
        total +
        (c.gendersCaught
          ? Object.values(c.gendersCaught).filter(g => g).length
          : 0) +
        (c.variantsCaught
          ? Object.values(c.variantsCaught).filter(v => v).length
          : 0),
      0
    );

    const gendersAndVariantsTotal = pokedexKeys.reduce(
      (total, id) =>
        total + pokedex[id].genders.length + pokedex[id].variants.length,
      0
    );

    const finalEvolutionIds = pokedexKeys.filter(
      id => Object.keys(pokedex[id].evolutions).length === 0
    );

    const amazingFinalEvolutionCount = finalEvolutionIds.filter(
      id => collection[id] && collection[id].hasAmazing
    ).length;

    const amazingFinalEvolutionTotal = finalEvolutionIds.length;

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
          value={amazingFinalEvolutionCount}
          total={amazingFinalEvolutionTotal}
        />
      </List>
    );
  }
}
