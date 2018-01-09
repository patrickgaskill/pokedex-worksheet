// @flow
import React from "react";
import { Menu, Dropdown, Checkbox } from "semantic-ui-react";
import type { Settings } from "./types";

type Props = {
  settings: Settings,
  onClick: (SyntheticEvent<any>, any) => void
};

export default class SettingsMenu extends React.Component<Props> {
  render() {
    const { settings: { enableLegacyCatches }, onClick } = this.props;
    return (
      <Menu attached="top">
        <Dropdown item icon="settings" simple className="right">
          <Dropdown.Menu>
            <Dropdown.Item>
              <Checkbox
                name="enableLegacyCatches"
                label="Enable legacy catches"
                checked={enableLegacyCatches}
                onClick={onClick}
              />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    );
  }
}
