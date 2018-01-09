// @flow
export type Settings = {
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

export type GendersCaught = {
  [Gender]: {
    normal?: boolean,
    shiny?: boolean
  }
};

export type Collected = {
  legacyCaught: boolean,
  gendersCaught: GendersCaught
};

export type Collection = {
  [string]: Collected
};

export type HandleLegacyClick = (pokemonId: string) => void;

export type HandleGenderClick = (
  pokemonId: string,
  gender: Gender,
  forShiny?: boolean
) => void;
