import React from "react";
import ReactTable from "react-table";
import update from "immutability-helper";
import "react-table/react-table.css";
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

  columns = [
    {
      Header: "No.",
      accessor: "id",
      Cell: props => this.formatPokemonNumber(props.value)
    },
    { Header: "Name", accessor: "name" },
    {
      Header: "Seen",
      accessor: "seen",
      Cell: props => (
        <input
          type="checkbox"
          checked={props.value}
          onClick={this.handleSeenClick(props.index)}
        />
      ),
      style: { textAlign: "center" }
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
