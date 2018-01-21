// @flow
import React from "react";
import { Segment, Grid, Progress } from "semantic-ui-react";
import { countTrueValues } from "./utils";
import type { Settings, Form, Pokedex, Collection } from "./types";

type Props = {
  settings: Settings,
  pokedex: Pokedex,
  collection: Collection
};

export default class ProgressBars extends React.PureComponent<Props> {
  render() {
    const {
      settings: { enableLegacyCatches },
      pokedex,
      collection
    } = this.props;
    const pokedexTotal = pokedex.length;
    let pokedexValue = 0;
    let gfvValue = 0;
    let gfvTotal = 0;

    for (let p of pokedex) {
      // Forms supercede genders, but we always add variants
      // $FlowFixMe
      const formsCount = countTrueValues(p.forms, f => f.active);
      const gendersCount = countTrueValues(p.genders);
      const variantsCount = countTrueValues(p.variants);
      gfvTotal += (formsCount > 0 ? formsCount : gendersCount) + variantsCount;

      if (p.canBeShiny) {
        // Double the amount of forms or genders
        gfvTotal += formsCount > 0 ? formsCount : gendersCount;
      }

      if (collection[p.id]) {
        const {
          formsCaught,
          gendersCaught,
          shiniesCaught,
          variantsCaught,
          legacyCaught
        } = collection[p.id];
        const formsCaughtCount = formsCaught ? countTrueValues(formsCaught) : 0;
        const gendersCaughtCount = gendersCaught
          ? countTrueValues(gendersCaught)
          : 0;
        const shiniesCaughtCount = shiniesCaught
          ? countTrueValues(shiniesCaught)
          : 0;
        const variantsCaughtCount = variantsCaught
          ? countTrueValues(variantsCaught)
          : 0;

        gfvValue +=
          (formsCaughtCount > 0 ? formsCaughtCount : gendersCaughtCount) +
          shiniesCaughtCount +
          variantsCaughtCount;

        if (
          formsCaughtCount ||
          gendersCaughtCount ||
          shiniesCaughtCount ||
          variantsCaughtCount ||
          (enableLegacyCatches && legacyCaught)
        ) {
          pokedexValue++;
        }
      }
    }

    return (
      <Segment attached>
        <Grid stackable columns={2} textAlign="center">
          <Grid.Row>
            <Grid.Column>
              <Progress
                indicating
                size="small"
                value={pokedexValue}
                total={pokedexTotal}
              >
                Pokédex ({pokedexValue}/{pokedexTotal})
              </Progress>
            </Grid.Column>
            <Grid.Column>
              <Progress
                indicating
                size="small"
                value={gfvValue}
                total={gfvTotal}
              >
                Genders, forms, variants ({gfvValue}/{gfvTotal})
              </Progress>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}
