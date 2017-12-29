import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";
import { possibleFilters } from "./constants";

export default class FilterForm extends React.PureComponent {
  static propTypes = {
    filter: PropTypes.oneOf(possibleFilters).isRequired,
    includeSpecials: PropTypes.bool.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    onIncludeSpecialsChange: PropTypes.func.isRequired
  };

  render() {
    const {
      filter,
      includeSpecials,
      onFilterChange,
      onIncludeSpecialsChange
    } = this.props;
    return (
      <Form>
        <Form.Group inline>
          <Form.Radio
            label="Show all"
            name="filterGroup"
            value="SHOW_ALL"
            checked={filter === "SHOW_ALL"}
            onChange={onFilterChange}
          />
          <Form.Radio
            label="Show uncaught"
            name="filterGroup"
            value="SHOW_UNCAUGHT"
            checked={filter === "SHOW_UNCAUGHT"}
            onChange={onFilterChange}
          />
          <Form.Radio
            radio
            label="Show missing genders & variants"
            name="filterGroup"
            value="SHOW_GENDERS_VARIANTS"
            checked={filter === "SHOW_GENDERS_VARIANTS"}
            onChange={onFilterChange}
          />
          <Form.Radio
            radio
            label="Show missing amazing final evolutions"
            name="filterGroup"
            value="SHOW_AMAZING_FINAL_EVOLUTIONS"
            checked={filter === "SHOW_AMAZING_FINAL_EVOLUTIONS"}
            onChange={onFilterChange}
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
