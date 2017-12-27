import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import update from "immutability-helper";
import { Label } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import {
  formatPokemonNumber,
  mapGenderToColor,
  mapGenderToContent,
  mapGenderToIcon
} from "./utils";
import defaultPokedex from "./pokedex.json";

class App extends React.Component {
  state = {
    pokedex: defaultPokedex
  };

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
      Cell: props => formatPokemonNumber(props.value)
    },
    { Header: "Name", accessor: "name", width: 120 },
    {
      Header: "Caught",
      id: "caught",
      sortable: false,
      accessor: p => ({
        seen: p.seen,
        genders: p.genders,
        variants: p.variants || null
      }),
      style: {
        whiteSpace: "normal"
      },
      Cell: props => (
        <Label.Group>
          <Label
            as="a"
            icon="eye"
            content="Seen"
            color={props.value.seen ? "purple" : null}
            onClick={this.handleSeenClick(props.index)}
          />
          {Object.keys(props.value.genders).map(g => (
            <Label
              key={g}
              as="a"
              icon={mapGenderToIcon(g)}
              content={mapGenderToContent(g)}
              color={props.value.genders[g] ? mapGenderToColor(g) : null}
              onClick={this.handleGenderClick(props.index, g)}
            />
          ))}
          {props.value.variants &&
            Object.keys(props.value.variants).map(v => (
              <Label
                key={v}
                as="a"
                icon="check"
                content={v.charAt(0).toUpperCase() + v.slice(1)}
                color={props.value.variants[v] ? "green" : null}
                onClick={this.handleVariantClick(props.index, v)}
              />
            ))}
        </Label.Group>
      )
    }
  ];

  render() {
    const { pokedex } = this.state;
    return (
      <ReactTable
        className="-striped"
        data={pokedex}
        columns={this.columns}
        getTrProps={(state, rowInfo) => {
          if (rowInfo) {
            if (rowInfo.original.legendary) {
              return { style: { background: "#FFECB3" } };
            } else if (rowInfo.original.regional) {
              return { style: { background: "#C8E6C9" } };
            }
          }

          return {};
        }}
      />
    );
  }
}

export default App;
