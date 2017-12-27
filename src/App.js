import React from "react";
import update from "immutability-helper";
import { Container, Menu, Grid } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import PokedexFilterForm from "./PokedexFilterForm";
import ProgressBarList from "./ProgressBarList";
import PokedexTable from "./PokedexTable";
import "./App.css";
import defaultPokedex from "./pokedex.json";

class App extends React.Component {
  state = {
    pokedexFilter: "all",
    includeSpecials: true,
    pokedex: defaultPokedex
  };

  componentDidMount() {
    if (localStorage.state) {
      const nextState = JSON.parse(localStorage.state);
      this.setState(prevState => ({
        ...prevState,
        ...nextState
      }));
    }
  }

  componentDidUpdate() {
    localStorage.state = JSON.stringify(this.state);
  }

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
      filtered = filtered.filter(
        p =>
          Object.values(p.genders).includes(false) ||
          (p.variants && Object.values(p.variants).includes(false))
      );
    } else if (pokedexFilter === "amazing") {
      filtered = filtered.filter(p => !p.evolvesInto && !p.amazing);
    }

    if (!includeSpecials) {
      filtered = filtered.filter(p => !p.regional && !p.legendary);
    }

    return filtered;
  };

  render() {
    const { pokedex, pokedexFilter, includeSpecials } = this.state;
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
              <ProgressBarList pokedex={pokedex} />
            </Grid.Column>
          </Grid.Row>
        </Menu>
        <Container style={{ marginTop: "10em" }}>
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
