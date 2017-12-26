import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./App.css";
import defaultPokedex from "./pokedex.json";

class App extends React.Component {
  state = {
    pokedex: defaultPokedex
  };

  formatPokemonNumber = id => `#${id.toString().padStart(3, "0")}`;

  render() {
    const columns = [
      {
        Header: "No.",
        accessor: "id",
        Cell: row => this.formatPokemonNumber(row.value)
      },
      { Header: "Name", accessor: "name" }
    ];

    return <ReactTable data={this.state.pokedex} columns={columns} />;
  }
}

export default App;
