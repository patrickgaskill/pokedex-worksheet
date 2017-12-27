import React from "react";
import update from "immutability-helper";
import { Container, Menu, Segment } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import PokedexFilterForm from "./PokedexFilterForm";
import PokedexTable from "./PokedexTable";
import "./App.css";
import defaultPokedex from "./pokedex.json";

class App extends React.Component {
  state = {
    pokedexFilter: "all",
    includeSpecials: true,
    pokedex: defaultPokedex
  };

  handleIncludeSpecialsChange = (e, { checked }) => {
    this.setState({ includeSpecials: checked });
  };

  handlePokedexFilterChange = (e, { value }) => {
    this.setState({ pokedexFilter: value });
  };

  handleSeenClick = id => e => {
    this.setState(prevState => {
      const index = prevState.pokedex.findIndex(p => p.id === id);
      return {
        pokedex: update(prevState.pokedex, { [index]: { $toggle: ["seen"] } })
      };
    });
  };

  handleAmazingClick = id => e => {
    this.setState(prevState => {
      const index = prevState.pokedex.findIndex(p => p.id === id);
      return {
        pokedex: update(prevState.pokedex, {
          [index]: { $toggle: ["amazing"] }
        })
      };
    });
  };

  handleGenderClick = id => gender => e => {
    this.setState(prevState => {
      const index = prevState.pokedex.findIndex(p => p.id === id);
      return {
        pokedex: update(prevState.pokedex, {
          [index]: { genders: { $toggle: [gender] } }
        })
      };
    });
  };

  handleVariantClick = id => variant => e => {
    this.setState(prevState => {
      const index = prevState.pokedex.findIndex(p => p.id === id);
      return {
        pokedex: update(prevState.pokedex, {
          [index]: { variants: { $toggle: [variant] } }
        })
      };
    });
  };

  getFilteredPokedex = () => {
    const { pokedexFilter, includeSpecials, pokedex } = this.state;
    let filtered = pokedex;

    if (pokedexFilter === "uncaught") {
      filtered = filtered.filter(p => !Object.values(p.genders).includes(true));
    } else if (pokedexFilter === "genders") {
      filtered = filtered.filter(p => Object.values(p.genders).includes(false));
    } else if (pokedexFilter === "amazing") {
      filtered = filtered.filter(p => !p.amazing);
    }

    if (!includeSpecials) {
      filtered = filtered.filter(p => !p.regional && !p.legendary);
    }

    return filtered;
  };

  render() {
    const { pokedexFilter, includeSpecials } = this.state;
    return (
      <div>
        <Menu as={Segment} fixed="top">
          <PokedexFilterForm
            pokedexFilter={pokedexFilter}
            includeSpecials={includeSpecials}
            onPokedexFilterChange={this.handlePokedexFilterChange}
            onIncludeSpecialsChange={this.handleIncludeSpecialsChange}
          />
        </Menu>
        <Container style={{ marginTop: "7em" }}>
          <PokedexTable
            pokedex={this.getFilteredPokedex()}
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
