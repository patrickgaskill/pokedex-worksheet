// @flow
import React from "react";
import { Form } from "semantic-ui-react";
import { filters } from "./constants";
import type { Filter } from "./constants";

type Props = {
  filter: Filter,
  includeSpecials: boolean,
  onFilterChange: (
    SyntheticMouseEvent<HTMLDivElement>,
    { value: Filter }
  ) => void,
  onIncludeSpecialsChange: (
    SyntheticMouseEvent<HTMLDivElement>,
    { checked: boolean }
  ) => void
};

export default class FilterForm extends React.PureComponent<Props> {
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
            value={filters.SHOW_ALL}
            checked={filter === filters.SHOW_ALL}
            onChange={onFilterChange}
          />
          <Form.Radio
            label="Show uncaught"
            name="filterGroup"
            value={filters.SHOW_UNCAUGHT}
            checked={filter === filters.SHOW_UNCAUGHT}
            onChange={onFilterChange}
          />
          <Form.Radio
            radio
            label="Show missing genders & variants"
            name="filterGroup"
            value={filters.SHOW_UNCAUGHT_GENDERS_VARIANTS}
            checked={filter === filters.SHOW_UNCAUGHT_GENDERS_VARIANTS}
            onChange={onFilterChange}
          />
          <Form.Radio
            radio
            label="Show missing amazing final evolutions"
            name="filterGroup"
            value={filters.SHOW_UNCAUGHT_AMAZING_FINAL_EVOLUTIONS}
            checked={filter === filters.SHOW_UNCAUGHT_AMAZING_FINAL_EVOLUTIONS}
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
