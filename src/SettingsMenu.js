// @flow
import React from "react";
import { Menu, Dropdown, Checkbox } from "semantic-ui-react";
import { filters } from "./constants";
import type {
  Settings,
  HandleSettingsClick,
  HandleFilterChange
} from "./types";

type Props = {
  settings: Settings,
  onSettingsClick: HandleSettingsClick,
  onFilterChange: HandleFilterChange
};

export default class SettingsMenu extends React.Component<Props> {
  filterOptions = [
    {
      text: "all Pokémon",
      value: filters.ALL
    },
    {
      text: "uncaught Pokémon",
      value: filters.UNCAUGHT
    },
    {
      text: "uncaught genders, forms, or variants",
      value: filters.UNCAUGHT_GFV
    }
  ];

  render() {
    const {
      settings: { filter, enableLegacyCatches },
      onSettingsClick,
      onFilterChange
    } = this.props;
    return (
      <Menu attached="top" borderless>
        <Menu.Item>
          <span>
            Show me{" "}
            <Dropdown
              inline
              options={this.filterOptions}
              value={filter}
              onChange={onFilterChange}
            />
          </span>
        </Menu.Item>
        <Dropdown item icon="settings" simple className="right">
          <Dropdown.Menu>
            <Dropdown.Item>
              <Checkbox
                name="enableLegacyCatches"
                label="Enable legacy catches"
                checked={enableLegacyCatches}
                onClick={onSettingsClick}
              />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    );
  }
}
