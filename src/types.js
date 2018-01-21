// @flow
import { filters, rarities } from "./constants";

export type Filter = $Keys<typeof filters>;

export type Settings = {|
  filter: Filter,
  enableLegacyCatches: boolean
|};

export type PokedexEvolutions = {
  [string]: {|
    candyCost: number,
    evolutionItemRequirement?: string
  |}
};

export type PokedexForms = {
  [string]: {|
    active: boolean,
    displayName: string,
    sortOrder: number
  |}
};

export type Gender = "male" | "female" | "genderless";

export type PokedexGenders = {
  [Gender]: boolean
};

export type PokedexVariants = {|
  ash?: boolean,
  party?: boolean,
  santa?: boolean,
  witch?: boolean
|};

export type Rarity = $Values<typeof rarities>;

export type Pokemon = {|
  id: string,
  active: boolean,
  canBeShiny: boolean,
  evolutions: PokedexEvolutions,
  familyId: string,
  forms: PokedexForms,
  genders: PokedexGenders,
  isRegional: boolean,
  name: string,
  number: number,
  rarity: ?Rarity,
  variants: PokedexVariants
|};

export type Pokedex = Array<Pokemon>;

export type GendersCaught = {
  [Gender]: boolean
};

export type ShiniesCaught = {
  [Gender]: boolean
};

export type FormsCaught = {
  [string]: boolean
};

export type VariantsCaught = {
  [string]: boolean
};

export type Collected = {|
  legacyCaught: boolean,
  gendersCaught: GendersCaught,
  shiniesCaught: ShiniesCaught,
  formsCaught: FormsCaught,
  variantsCaught: VariantsCaught
|};

export type Collection = {
  [string]: Collected
};

export type HandleFilterChange = (SyntheticEvent<any>, any) => void;
export type HandleSettingsClick = (SyntheticEvent<any>, any) => void;
export type HandleCollectionClick = (pokemonId: string, data: any) => void;
