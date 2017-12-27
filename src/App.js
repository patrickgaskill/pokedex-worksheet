import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import update from "immutability-helper";
import GenderIcon from "./GenderIcon";
import "./App.css";
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
        <input
          type="checkbox"
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
