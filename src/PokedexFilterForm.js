import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

export default class PokedexFilterForm extends React.Component {
  static propTypes = {
    pokedexFilter: PropTypes.oneOf(["all", "uncaught", "genders", "amazing"])
      .isRequired,
    includeSpecials: PropTypes.bool.isRequired,
    onPokedexFilterChange: PropTypes.func.isRequired,
    onIncludeSpecialsChange: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.pokedexFilter !== this.props.pokedexFilter) {
      return true;
    }

    if (nextProps.includeSpecials !== this.props.includeSpecials) {
      return true;
    }

    return false;
  }

  render() {
    const {
      pokedexFilter,
      includeSpecials,
      onPokedexFilterChange,
      onIncludeSpecialsChange
    } = this.props;
    return (
      <Form>
        <Form.Group inline>
          <Form.Radio
            label="Show all"
            name="pokedexFilterGroup"
            value="all"
            checked={pokedexFilter === "all"}
            onChange={onPokedexFilterChange}
          />
          <Form.Radio
            label="Show uncaught"
            name="pokedexFilterGroup"
            value="uncaught"
            checked={pokedexFilter === "uncaught"}
            onChange={onPokedexFilterChange}
          />
          <Form.Radio
            radio
            label="Show missing genders & variants"
            name="pokedexFilterGroup"
            value="genders"
            checked={pokedexFilter === "genders"}
            onChange={onPokedexFilterChange}
          />
          <Form.Radio
            radio
            label="Show missing amazing final evolutions"
            name="pokedexFilterGroup"
            value="amazing"
            checked={pokedexFilter === "amazing"}
            onChange={onPokedexFilterChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Checkbox
            label="Include regionals and legendaries"
            checked={includeSpecials}
            onChange={onIncludeSpecialsChange}
          />
        </Form.Group>
      </Form>
    );
  }
}
