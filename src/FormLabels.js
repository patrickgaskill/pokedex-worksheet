// @flow
import React from "react";
import { Label } from "semantic-ui-react";
import type { PokedexForms, FormsCaught, HandleCollectionClick } from "./types";

type Props = {
  pokemonId: string,
  forms: PokedexForms,
  formsCaught: FormsCaught,
  onClick: HandleCollectionClick
};

export default class FormLabels extends React.PureComponent<Props> {
  getActiveFormIds = () => {
    const { forms } = this.props;
    return Object.keys(forms)
      .filter(f => forms[f].active)
      .sort((a, b) => forms[a].sortOrder - forms[b].sortOrder);
  };

  userHasCaught = (form: string) => {
    const { formsCaught } = this.props;
    return Boolean(formsCaught && formsCaught[form]);
  };

  getColor = (form: string) => (this.userHasCaught(form) ? "grey" : undefined);

  handleClick = (form: string) => () => {
    const { pokemonId, onClick } = this.props;
    const userHasCaught = this.userHasCaught(form);
    onClick(pokemonId, { formsCaught: { [form]: !userHasCaught } });
  };

  render() {
    const { forms } = this.props;
    return (
      <span>
        {this.getActiveFormIds().map(form => (
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
