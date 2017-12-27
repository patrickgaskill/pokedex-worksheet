import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import update from "immutability-helper";
import { Segment, Form, Label } from "semantic-ui-react";
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

  getFilteredPokedex = () => {
    const { pokedexFilter, includeSpecials, pokedex } = this.state;
    let filtered = pokedex;

    if (pokedexFilter === "uncaught") {
      filtered = filtered.filter(p => !Object.values(p.genders).includes(true));
    } else if (pokedexFilter === "genders") {
      filtered = filtered.filter(p => Object.values(p.genders).includes(false));
    }

    if (!includeSpecials) {
      filtered = filtered.filter(p => !p.regional && !p.legendary);
    }

    return filtered;
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
        <ReactTable
          className="-striped"
          data={this.getFilteredPokedex()}
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
      </div>
    );
  }
}

export default App;
