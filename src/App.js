import React from "react";
import update from "immutability-helper";
import { Container, Menu, Grid } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import FilterForm from "./FilterForm";
import ProgressBarList from "./ProgressBarList";
import PokedexTable from "./PokedexTable";
import "./App.css";
import { hasEvolutions } from "./utils";
import defaultPokedex from "./pokedex.json";
import defaultCollection from "./collection.json";

class App extends React.Component {
  state = {
    filter: "SHOW_ALL",
    includeSpecials: true,
    pokedex: defaultPokedex,
    collection: defaultCollection
  };

  handleIncludeSpecialsChange = (e, { checked }) => {
    this.setState({ includeSpecials: checked });
  };

  handleFilterChange = (e, { value }) => {
    this.setState({ filter: value });
  };

  handleSeenClick = id => {
    this.setState(prevState => ({
      collection: update(prevState.collection, {
        [id]: { $toggle: ["isSeen"] }
      })
    }));
  };

  handleAmazingClick = id => {
    this.setState(prevState => ({
      collection: update(prevState.collection, {
        [id]: { $toggle: ["hasAmazing"] }
      })
    }));
  };

  handleGenderClick = (id, gender) => {
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

  handleVariantClick = (id, variant) => {
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

  getVisibleIds = () => {
    const { pokedex, collection, filter, includeSpecials } = this.state;
    return Object.keys(pokedex).filter(id => {
      const p = pokedex[id];
      const c = collection[id];

      if (!includeSpecials) {
        return !p.isRegional && !p.isLegendary;
      }

      if (filter === "SHOW_UNCAUGHT") {
        const caughtSomething = Object.values(c.gendersCaught).includes(true);
        return !caughtSomething;
      }

      if (filter === "SHOW_GENDERS_VARIANTS") {
        const caughtAllGenders = p.genders.every(g => c.gendersCaught[g]);
        const caughtAllVariants =
          p.variants.length === 0 || p.variants.every(v => c.variantsCaught[v]);
        return !caughtAllGenders || !caughtAllVariants;
      }

      if (filter === "SHOW_AMAZING_FINAL_EVOLUTIONS") {
        return !hasEvolutions(p.evolutions) && !c.hasAmazing;
      }

      return true;
    });
  };

  render() {
    const { pokedex, collection, filter, includeSpecials } = this.state;
    return (
      <div>
        <Menu as={Grid} fixed="top">
          <Grid.Row>
            <Grid.Column width={10}>
              <FilterForm
                filter={filter}
                includeSpecials={includeSpecials}
                onFilterChange={this.handleFilterChange}
                onIncludeSpecialsChange={this.handleIncludeSpecialsChange}
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <ProgressBarList pokedex={pokedex} collection={collection} />
            </Grid.Column>
          </Grid.Row>
        </Menu>
        <Container style={{ marginTop: "10em" }}>
          <PokedexTable
            visibleIds={this.getVisibleIds()}
            pokedex={pokedex}
            collection={collection}
            onSeenClick={this.handleSeenClick}
            onAmazingClick={this.handleAmazingClick}
            onGenderClick={this.handleGenderClick}
            onVariantClick={this.handleVariantClick}
          />
        </Container>
      </div>
    );
  }
}

export default App;
