import React from "react";
import { AutoSizer, Grid } from "react-virtualized";
import "react-virtualized/styles.css";
import "./App.css";
import defaultPokedex from "./pokedex.json";

class App extends React.Component {
  state = {
    pokedex: defaultPokedex
  };

  cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    const { pokedex } = this.state;
    switch (columnIndex) {
      case 0:
        return (
          <div key={key} style={style}>
            {pokedex[rowIndex].id}
          </div>
        );
      case 1:
        return (
          <div key={key} style={style}>
            {pokedex[rowIndex].name}
          </div>
        );
      case 2:
        return (
          <div key={key} style={style}>
            {pokedex[rowIndex].seen ? "Yes" : "No"}
          </div>
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Grid
            cellRenderer={this.cellRenderer}
            columnCount={3}
            columnWidth={100}
            height={height}
            rowCount={this.state.pokedex.length}
            rowHeight={30}
            width={width}
          />
        )}
      </AutoSizer>
    );
  }
}

export default App;
