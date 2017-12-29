// @flow
import React from "react";
import { Label } from "semantic-ui-react";
import { mapGenderToIcon, mapGenderToContent, mapGenderToColor } from "./utils";
import type { PokemonId, Gender } from "./constants";

type Props = {
  gender: Gender,
  isCaught: boolean,
  onClick: (PokemonId, Gender) => void
};

export default class GenderLabel extends React.PureComponent<Props> {
  render() {
    const { gender, isCaught, onClick } = this.props;
    return (
      <Label
        as="a"
        icon={mapGenderToIcon(gender)}
        content={mapGenderToContent(gender)}
        color={isCaught ? mapGenderToColor(gender) : null}
        onClick={onClick}
      />
    );
  }
}
