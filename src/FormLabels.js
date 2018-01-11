// @flow
import React from "react";
import { Label } from "semantic-ui-react";
import type { PokedexForms, FormsCaught, HandleFormClick } from "./types";

type Props = {
  pokemonId: string,
  forms: PokedexForms,
  formsCaught: FormsCaught,
  onClick: HandleFormClick
};

export default class FormLabels extends React.PureComponent<Props> {
  // userHasCaught = (gender: Gender, forShiny: boolean) => {
  //   const { gendersCaught } = this.props;
  //   const shinyKey = forShiny ? "shiny" : "normal";
  //   return Boolean(
  //     gendersCaught &&
  //       gender in gendersCaught &&
  //       gendersCaught[gender][shinyKey]
  //   );
  // };

  // getColor = (gender: Gender, forShiny: boolean) =>
  //   this.userHasCaught(gender, forShiny)
  //     ? this.genderMap[gender].color
  //     : undefined;

  // handleClick = (gender: Gender, forShiny: boolean) => () => {
  //   const { pokemonId, onClick } = this.props;
  //   const userHasCaught = this.userHasCaught(gender, forShiny);
  //   onClick(pokemonId, gender, forShiny, userHasCaught);
  // };

  activeFormIds = () => {
    const { forms } = this.props;
    return Object.keys(forms)
      .filter(f => forms[f].active)
      .sort((a, b) => forms[a].sortOrder - forms[b].sortOrder);
  };

  userHasCaught = (form: string) => {
    const { formsCaught } = this.props;
    return Boolean(formsCaught && form in formsCaught && formsCaught[form]);
  };

  getColor = (form: string) => (this.userHasCaught(form) ? "grey" : undefined);

  handleClick = (form: string) => () => {
    const { pokemonId, onClick } = this.props;
    const userHasCaught = this.userHasCaught(form);
    onClick(pokemonId, form, !userHasCaught);
  };

  render() {
    const { forms } = this.props;
    return (
      <span>
        {this.activeFormIds().map(form => (
          <Label
            key={form}
            as="a"
            content={forms[form].displayName}
            color={this.getColor(form)}
            onClick={this.handleClick(form)}
            horizontal
          />
        ))}
      </span>
    );
  }
}
