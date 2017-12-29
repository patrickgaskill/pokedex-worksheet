// @flow

export const filters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_UNCAUGHT: "SHOW_UNCAUGHT",
  SHOW_UNCAUGHT_GENDERS_VARIANTS: "SHOW_UNCAUGHT_GENDERS_VARIANTS",
  SHOW_UNCAUGHT_AMAZING_FINAL_EVOLUTIONS:
    "SHOW_UNCAUGHT_AMAZING_FINAL_EVOLUTIONS"
};

export type Filter = $Keys<typeof filters>;

const genders = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  MALE_SHINY: "MALE_SHINY",
  FEMALE_SHINY: "FEMALE_SHINY",
  GENDERLESS: "GENDERLESS",
  GENDERLESS_SHINY: "GENDERLESS_SHINY",
  UNOWN_A: "UNOWN_A",
  UNOWN_B: "UNOWN_B",
  UNOWN_C: "UNOWN_C",
  UNOWN_D: "UNOWN_D",
  UNOWN_E: "UNOWN_E",
  UNOWN_F: "UNOWN_F",
  UNOWN_G: "UNOWN_G",
  UNOWN_H: "UNOWN_H",
  UNOWN_I: "UNOWN_I",
  UNOWN_J: "UNOWN_J",
  UNOWN_K: "UNOWN_K",
  UNOWN_L: "UNOWN_L",
  UNOWN_M: "UNOWN_M",
  UNOWN_N: "UNOWN_N",
  UNOWN_O: "UNOWN_O",
  UNOWN_P: "UNOWN_P",
  UNOWN_Q: "UNOWN_Q",
  UNOWN_R: "UNOWN_R",
  UNOWN_S: "UNOWN_S",
  UNOWN_T: "UNOWN_T",
  UNOWN_U: "UNOWN_U",
  UNOWN_V: "UNOWN_V",
  UNOWN_W: "UNOWN_W",
  UNOWN_X: "UNOWN_X",
  UNOWN_Y: "UNOWN_Y",
  UNOWN_Z: "UNOWN_Z"
};

export type Gender = $Keys<typeof genders>;

const variants = {
  PARTY_HAT: "PARTY_HAT",
  SANTA_HAT: "SANTA_HAT",
  ASH_HAT: "ASH_HAT",
  WITCH_HAT: "WITCH_HAT"
};

export type Variant = $Keys<typeof variants>;

const items = {
  SUN_STONE: "SUN_STONE",
  KINGS_ROCK: "KINGS_ROCK",
  DRAGON_SCALE: "DRAGON_SCALE",
  METAL_COAT: "METAL_COAT",
  UP_GRADE: "UP_GRADE"
};

type Item = $Keys<typeof items>;

export type PokemonId = number | string;

export type Evolutions = {
  [PokemonId]: {
    candy: number,
    item?: Item
  }
};

export type PokedexEntry = {
  name: string,
  genders: Array<Gender>,
  variants: Array<Variant>,
  evolutions: Evolutions,
  candyType: number,
  isLegendary: boolean,
  isRegional: boolean
};

export type Pokedex = { [PokemonId]: PokedexEntry };

export type CollectionEntry = {
  isSeen: boolean,
  hasAmazing: boolean,
  gendersCaught: { [Gender]: boolean },
  variantsCaught: { [Variant]: boolean }
};

export type Collection = { [PokemonId]: CollectionEntry };
