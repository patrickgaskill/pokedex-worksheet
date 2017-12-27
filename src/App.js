import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import update from "immutability-helper";
import { Checkbox, Label } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import GenderIcon from "./GenderIcon";
import defaultPokedex from "./pokedex.json";

class App extends React.Component {
  state = {
    pokedex: defaultPokedex
  };

  formatPokemonNumber = id => `#${id.toString().padStart(3, "0")}`;

  handleSeenClick = index => e => {
    this.setState(prevState => ({
      pokedex: update(prevState.pokedex, { [index]: { $toggle: ["seen"] } })
    }));
  };

  handleGenderClick = (index, gender) => e => {
    this.setState(prevState => ({
      pokedex: update(prevState.pokedex, {
        [index]: { genders: { $toggle: [gender] } }
      })
    }));
  };

  handleVariantClick = (index, variant) => e => {
    this.setState(prevState => ({
      pokedex: update(prevState.pokedex, {
        [index]: { variants: { $toggle: [variant] } }
      })
    }));
  };

  columns = [
    {
      Header: "No.",
      accessor: "id",
      width: 60,
      Cell: props => this.formatPokemonNumber(props.value)
    },
    { Header: "Name", accessor: "name", width: 120 },
    {
      Header: "Seen",
      accessor: "seen",
      style: { textAlign: "center" },
      width: 60,
      Cell: props => (
        <Checkbox
          checked={props.value}
          onClick={this.handleSeenClick(props.index)}
        />
      )
    },
    {
      Header: "Genders Caught",
      accessor: "genders",
      Cell: props => (
        <div>
          {Object.keys(props.value).map(g => (
            <GenderIcon
              key={g}
              gender={g}
              disabled={!props.value[g]}
              onClick={this.handleGenderClick(props.index, g)}
            />
          ))}
        </div>
      )
    },
    {
      Header: "Variants Caught",
      accessor: "variants",
      Cell: props =>
        props.value ? (
          <Label.Group>
            {Object.keys(props.value).map(
              v =>
                props.value[v] ? (
                  <Label
                    as="a"
                    color="green"
                    icon="check"
                    content={v}
                    onClick={this.handleVariantClick(props.index, v)}
                  />
                ) : (
                  <Label
                    as="a"
                    content={v}
                    onClick={this.handleVariantClick(props.index, v)}
                  />
                )
            )}
          </Label.Group>
        ) : null
    }
  ];

  render() {
    const { pokedex } = this.state;
    return (
      <ReactTable className="-striped" data={pokedex} columns={this.columns} />
    );
  }
}

export default App;
