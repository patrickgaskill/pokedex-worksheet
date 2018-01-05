// @flow
import React from "react";
import update from "immutability-helper";
import "semantic-ui-css/semantic.min.css";
import firebaseApp from "./firebase";
import { hasEvolutions } from "./utils";
import { filters } from "./constants";
import type { Filter, PokemonId, Gender, Variant } from "./constants";
// import defaultPokedex from "./pokedex.json";
// import defaultCollection from "./collection.json";
// const Firestore = require("@google-cloud/firestore");

type State = {
  filter: Filter,
  includeSpecials: boolean,
  pokemon: Array<any>,
  collection: {},
  loading: boolean
};

class App extends React.Component<{}, State> {
  state = {
    filter: filters.SHOW_ALL,
    includeSpecials: true,
    pokemon: [],
    collection: {},
    loading: true
  };

  async componentDidMount() {
    const pokemonQuery = firebaseApp
      .firestore()
      .collection("pokemon")
      .orderBy("number");

    const pokemon = [];
    const snapshot = await pokemonQuery.get();
    snapshot.forEach(doc => {
      pokemon.push({ id: doc.id, ...doc.data() });
    });
    this.setState({ pokemon, loading: false });
  }

  handleIncludeSpecialsChange = (
    e: SyntheticMouseEvent<HTMLDivElement>,
    { checked }: { checked: boolean }
  ) => {
    this.setState({ includeSpecials: checked });
  };

  handleFilterChange = (
    e: SyntheticMouseEvent<HTMLDivElement>,
    { value }: { value: Filter }
  ) => {
    this.setState({ filter: value });
  };

  handleSeenClick = (id: PokemonId) => {
    this.setState(prevState => ({
      collection: update(prevState.collection, {
        [id]: { $toggle: ["isSeen"] }
      })
    }));
  };

  handleAmazingClick = (id: PokemonId) => {
    this.setState(prevState => ({
      collection: update(prevState.collection, {
        [id]: { $toggle: ["hasAmazing"] }
      })
    }));
  };

  handleGenderClick = (id: PokemonId, gender: Gender) => {
    this.setState(prevState => {
      const command =
        gender in prevState.collection[id].gendersCaught
          ? { [id]: { gendersCaught: { $toggle: [gender] } } }
          : { [id]: { gendersCaught: { $merge: { [gender]: true } } } };

      return {
        collection: update(prevState.collection, command)
      };
    });
  };

  handleVariantClick = (id: PokemonId, variant: Variant) => {
    this.setState(prevState => {
      const command =
        variant in prevState.collection[id].variantsCaught
          ? { [id]: { variantsCaught: { $toggle: [variant] } } }
          : { [id]: { variantsCaught: { $merge: { [variant]: true } } } };

      return {
        collection: update(prevState.collection, command)
      };
    });
  };

  // getVisibleIds = () => {
  //   const { pokedex, collection, filter, includeSpecials } = this.state;
  //   return Object.keys(pokedex).filter(id => {
  //     const p = pokedex[id];
  //     const c = collection[id];

  //     if (!includeSpecials) {
  //       return !p.isRegional && !p.isLegendary;
  //     }

  //     if (filter === filters.SHOW_UNCAUGHT) {
  //       const caughtSomething = Object.values(c.gendersCaught).includes(true);
  //       return !caughtSomething;
  //     }

  //     if (filter === filters.SHOW_UNCAUGHT_GENDERS_VARIANTS) {
  //       const caughtAllGenders = p.genders.every(g => c.gendersCaught[g]);
  //       const caughtAllVariants =
  //         p.variants.length === 0 || p.variants.every(v => c.variantsCaught[v]);
  //       return !caughtAllGenders || !caughtAllVariants;
  //     }

  //     if (filter === filters.SHOW_UNCAUGHT_AMAZING_FINAL_EVOLUTIONS) {
  //       return !hasEvolutions(p.evolutions) && !c.hasAmazing;
  //     }

  //     return true;
  //   });
  // };

  render() {
    return <div />;
  }
}

export default App;
