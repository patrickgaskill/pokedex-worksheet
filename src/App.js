import React from "react";
import update from "immutability-helper";
import { Segment, Form } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
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
        <Segment basic>
          <Form>
            <Form.Group inline>
              <Form.Radio
                label="Show all"
                name="pokedexFilterGroup"
                value="all"
                checked={pokedexFilter === "all"}
                onChange={this.handlePokedexFilterChange}
              />
              <Form.Radio
                label="Show uncaught"
                name="pokedexFilterGroup"
                value="uncaught"
                checked={pokedexFilter === "uncaught"}
                onChange={this.handlePokedexFilterChange}
              />
              <Form.Radio
                radio
                label="Show missing genders"
                name="pokedexFilterGroup"
                value="genders"
                checked={pokedexFilter === "genders"}
                onChange={this.handlePokedexFilterChange}
              />
              <Form.Radio
                radio
                label="Show missing amazing"
                name="pokedexFilterGroup"
                value="amazing"
                checked={pokedexFilter === "amazing"}
                onChange={this.handlePokedexFilterChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Checkbox
                label="Include regionals and legendaries"
                checked={includeSpecials}
                onChange={this.handleIncludeSpecialsChange}
              />
            </Form.Group>
          </Form>
        </Segment>
        <PokedexTable
          pokedex={this.getFilteredPokedex()}
          onSeenClick={this.handleSeenClick}
          onAmazingClick={this.handleAmazingClick}
          onGenderClick={this.handleGenderClick}
          onVariantClick={this.handleVariantClick}
        />
      </div>
    );
  }
}

export default App;
