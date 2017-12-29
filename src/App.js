import React from "react";
import update from "immutability-helper";
import { Container, Menu, Grid } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import PokedexFilterForm from "./PokedexFilterForm";
import ProgressBarList from "./ProgressBarList";
import PokedexTable from "./PokedexTable";
import "./App.css";
import defaultPokedex from "./new-pokedex.json";
// import defaultCollection from "./collection.json";

class App extends React.Component {
  state = {
    pokedexFilter: "all",
    includeSpecials: true,
    pokedex: defaultPokedex,
    collection: {}
  };

  handleIncludeSpecialsChange = (e, { checked }) => {
    this.setState({ includeSpecials: checked });
  };

  handlePokedexFilterChange = (e, { value }) => {
    this.setState({ pokedexFilter: value });
  };

  handleSeenClick = id => e => {
    this.setState(prevState => {
      const entry = prevState.collection[id];
      let command;
      if (entry) {
        if (entry.hasOwnProperty("isSeen")) {
          command = { [id]: { $toggle: ["isSeen"] } };
        } else {
          command = { [id]: { $merge: { isSeen: true } } };
        }
      } else {
        command = { $merge: { [id]: { isSeen: true } } };
      }

      return {
        collection: update(prevState.collection, command)
      };
    });
  };

  handleAmazingClick = id => e => {
    this.setState(prevState => {
      const entry = prevState.collection[id];
      let command;
      if (entry) {
        if (entry.hasOwnProperty("hasAmazing")) {
          command = { [id]: { $toggle: ["hasAmazing"] } };
        } else {
          command = { [id]: { $merge: { hasAmazing: true } } };
        }
      } else {
        command = { $merge: { [id]: { hasAmazing: true } } };
      }

      return {
        collection: update(prevState.collection, command)
      };
    });
  };

  handleGenderClick = id => gender => e => {
    this.setState(prevState => {
      const entry = prevState.collection[id];
      let command;
      if (entry) {
        if (entry.gendersCaught) {
          if (entry.gendersCaught.hasOwnProperty(gender)) {
            command = { [id]: { gendersCaught: { $toggle: [gender] } } };
          } else {
            command = {
              [id]: { gendersCaught: { $merge: { [gender]: true } } }
            };
          }
        } else {
          command = { [id]: { $merge: { gendersCaught: { [gender]: true } } } };
        }
      } else {
        command = { $merge: { [id]: { gendersCaught: { [gender]: true } } } };
      }

      return {
        collection: update(prevState.collection, command)
      };
    });
  };

  handleVariantClick = id => variant => e => {
    this.setState(prevState => {
      const entry = prevState.collection[id];
      let command;
      if (entry) {
        if (entry.variantsCaught) {
          if (entry.variantsCaught.hasOwnProperty(variant)) {
            command = { [id]: { variantsCaught: { $toggle: [variant] } } };
          } else {
            command = {
              [id]: { variantsCaught: { $merge: { [variant]: true } } }
            };
          }
        } else {
          command = {
            [id]: { $merge: { variantsCaught: { [variant]: true } } }
          };
        }
      } else {
        command = { $merge: { [id]: { variantsCaught: { [variant]: true } } } };
      }

      return {
        collection: update(prevState.collection, command)
      };
    });
  };

  getVisibleIds = () => {
    const { pokedex, collection, pokedexFilter, includeSpecials } = this.state;
    return Object.keys(pokedex).filter(id => {
      const p = pokedex[id];
      const c = collection[id];

      if (!includeSpecials) {
        return !p.isRegional && !p.isLegendary;
      }

      if (pokedexFilter === "uncaught") {
        const caughtSomething =
          c && c.gendersCaught && Object.values(c.gendersCaught).includes(true);
        return !caughtSomething;
      }

      if (pokedexFilter === "genders") {
        const caughtAllGenders =
          c && c.gendersCaught && p.genders.every(g => c.gendersCaught[g]);
        const caughtAllVariants =
          p.variants.length === 0 ||
          (c && c.variantsCaught && p.variants.every(v => c.variantsCaught[v]));
        return !(caughtAllGenders && caughtAllVariants);
      }

      if (pokedexFilter === "amazing") {
        return Object.keys(p.evolutions).length === 0 && !(c && c.hasAmazing);
      }

      return true;
    });
  };

  render() {
    const { pokedex, collection, pokedexFilter, includeSpecials } = this.state;
    return (
      <div>
        <Menu as={Grid} fixed="top">
          <Grid.Row>
            <Grid.Column width={10}>
              <PokedexFilterForm
                pokedexFilter={pokedexFilter}
                includeSpecials={includeSpecials}
                onPokedexFilterChange={this.handlePokedexFilterChange}
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
