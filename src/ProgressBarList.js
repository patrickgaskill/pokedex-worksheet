import React from "react";
import PropTypes from "prop-types";
import { List } from "semantic-ui-react";
import ProgressBarListItem from "./ProgressBarListItem";
import { pokemonPropTypes } from "./constants";

export default class ProgressBarList extends React.PureComponent {
  static propTypes = {
    pokedex: PropTypes.arrayOf(pokemonPropTypes).isRequired
  };

  getSeenValue = () => this.props.pokedex.filter(p => p.seen).length;

  getCaughtValue = () =>
    this.props.pokedex.filter(p => Object.values(p.genders).includes(true))
      .length;

  getGendersAndVariantsValue = () =>
    this.props.pokedex.reduce(
      (acc, p) =>
        acc +
        Object.values(p.genders).filter(p => p).length +
        (p.variants ? Object.values(p.variants).filter(p => p).length : 0),
      0
    );

  getGendersAndVariantsTotal = () =>
    this.props.pokedex.reduce(
      (acc, p) =>
        acc +
        Object.values(p.genders).length +
        (p.variants ? Object.values(p.variants).length : 0),
      0
    );

  render() {
    const pokedexLength = this.props.pokedex.length;
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
      </List>
    );
  }
}
