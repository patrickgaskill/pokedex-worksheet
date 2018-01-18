// @flow
export type Settings = {
  filter?: string,
  enableLegacyCatches?: boolean
};

export type PokedexEvolutions = {
  [string]: {
    candyCost: number,
    evolutionItemRequirement?: string
  }
};

export type PokedexForms = {
  [string]: {
    active: boolean,
    displayName: string,
    sortOrder: number
  }
};

export type Gender = "male" | "female" | "genderless";

export type PokedexGenders = {
  [Gender]: boolean
};

export type PokedexVariants = {
  ash?: boolean,
  party?: boolean,
  santa?: boolean,
  witch?: boolean
};

export type Pokemon = {
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
  rarity: ?string,
  variants: PokedexVariants
};

export type Pokedex = Array<Pokemon>;

export type GendersCaught = {
  [Gender]: {
    normal?: boolean,
    shiny?: boolean
  }
};

export type FormsCaught = {
  [string]: boolean
};

export type VariantsCaught = {
  [string]: boolean
};

export type Collected = {
  legacyCaught: boolean,
  gendersCaught: GendersCaught,
  shiniesCaught: GendersCaught,
  formsCaught: FormsCaught,
  variantsCaught: VariantsCaught
};

export type Collection = {
  [string]: Collected
};

export type HandleFilterChange = (SyntheticEvent<any>, any) => void;
export type HandleSettingsClick = (SyntheticEvent<any>, any) => void;
export type HandleCollectionClick = (pokemonId: string, data: any) => void;
