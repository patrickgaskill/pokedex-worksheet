import React from "react";
import { List } from "semantic-ui-react";
import ProgressBarListItem from "./ProgressBarListItem";
import { pokedexPropType, collectionPropType } from "./constants";

export default class ProgressBarList extends React.PureComponent {
  static propTypes = {
    pokedex: pokedexPropType.isRequired,
    collection: collectionPropType.isRequired
  };

  getSeenValue = () =>
    Object.values(this.props.collection).filter(c => c.isSeen).length;

  getCaughtValue = () =>
    Object.values(this.props.collection).filter(
      c => c.gendersCaught && Object.values(c.gendersCaught).includes(true)
    ).length;

  getGendersAndVariantsValue = () =>
    Object.values(this.props.collection).reduce(
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

  getGendersAndVariantsTotal = () =>
    Object.values(this.props.pokedex).reduce(
      (total, p) => total + p.genders.length + p.variants.length,
      0
    );

  getAmazingFinalEvolutionsValue = () => {
    const { pokedex, collection } = this.props;
    return Object.keys(collection).filter(
      id =>
        collection[id].hasAmazing &&
        Object.keys(pokedex[id].evolutions).length === 0
    ).length;
  };

  getAmazingFinalEvolutionsTotal = () =>
    Object.values(this.props.pokedex).filter(
      p => Object.keys(p.evolutions).length === 0
    ).length;

  render() {
    const pokedexLength = Object.keys(this.props.pokedex).length;
    return (
      <List>
        <ProgressBarListItem
          label="Seen"
          value={this.getSeenValue()}
          total={pokedexLength}
        />
        <ProgressBarListItem
          label="Caught"
          value={this.getCaughtValue()}
          total={pokedexLength}
        />
        <ProgressBarListItem
          label="Genders & variants"
          value={this.getGendersAndVariantsValue()}
          total={this.getGendersAndVariantsTotal()}
        />
        <ProgressBarListItem
          label="Amazing final evolutions"
          value={this.getAmazingFinalEvolutionsValue()}
          total={this.getAmazingFinalEvolutionsTotal()}
        />
      </List>
    );
  }
}
