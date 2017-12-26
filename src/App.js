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
    const { pokedex } = this.state;

    const columns = [
      {
        Header: "No.",
        accessor: "id",
        Cell: row => this.formatPokemonNumber(row.value)
      },
      { Header: "Name", accessor: "name" },
      { Header: "Seen", accessor: "seen" }
    ];

    return (
      <ReactTable
        data={pokedex}
        showPagination={false}
        defaultPageSize={pokedex.length}
        filterable
        columns={columns}
      />
    );
  }
}

export default App;
