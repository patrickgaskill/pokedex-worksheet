// @flow
import type { PokemonId, Gender, Variant, Evolutions } from "./constants";

export const formatPokemonNumber = (id: PokemonId) =>
  `#${id.toString().padStart(3, "0")}`;

export const mapGenderToContent = (gender: Gender) => {
  const genderMap = {
    MALE: "Male",
    MALE_SHINY: "Shiny Male",
    FEMALE: "Female",
    FEMALE_SHINY: "Shiny Female",
    GENDERLESS: "Genderless",
    GENDERLESS_SHINY: "Shiny Genderless",
    UNOWN_A: "A",
    UNOWN_B: "B",
    UNOWN_C: "C",
    UNOWN_D: "D",
    UNOWN_E: "E",
    UNOWN_F: "F",
    UNOWN_G: "G",
    UNOWN_H: "H",
    UNOWN_I: "I",
    UNOWN_J: "J",
    UNOWN_K: "K",
    UNOWN_L: "L",
    UNOWN_M: "M",
    UNOWN_N: "N",
    UNOWN_O: "O",
    UNOWN_P: "P",
    UNOWN_Q: "Q",
    UNOWN_R: "R",
    UNOWN_S: "S",
    UNOWN_T: "T",
    UNOWN_U: "U",
    UNOWN_V: "V",
    UNOWN_W: "W",
    UNOWN_X: "X",
    UNOWN_Y: "Y",
    UNOWN_Z: "Z"
  };
  return genderMap[gender];
};

export const mapGenderToIcon = (gender: Gender) => {
  const genderMap = {
    MALE: "man",
    MALE_SHINY: "man",
    FEMALE: "woman",
    FEMALE_SHINY: "woman",
    GENDERLESS: "genderless",
    GENDERLESS_SHINY: "genderless",
    UNOWN_A: null,
    UNOWN_B: null,
    UNOWN_C: null,
    UNOWN_D: null,
    UNOWN_E: null,
    UNOWN_F: null,
    UNOWN_G: null,
    UNOWN_H: null,
    UNOWN_I: null,
    UNOWN_J: null,
    UNOWN_K: null,
    UNOWN_L: null,
    UNOWN_M: null,
    UNOWN_N: null,
    UNOWN_O: null,
    UNOWN_P: null,
    UNOWN_Q: null,
    UNOWN_R: null,
    UNOWN_S: null,
    UNOWN_T: null,
    UNOWN_U: null,
    UNOWN_V: null,
    UNOWN_W: null,
    UNOWN_X: null,
    UNOWN_Y: null,
    UNOWN_Z: null
  };
  return genderMap[gender];
};

export const mapGenderToColor = (gender: Gender) => {
  const genderMap = {
    MALE: "blue",
    MALE_SHINY: "blue",
    FEMALE: "pink",
    FEMALE_SHINY: "pink",
    GENDERLESS: "grey",
    GENDERLESS_SHINY: "grey",
    UNOWN_A: "grey",
    UNOWN_B: "grey",
    UNOWN_C: "grey",
    UNOWN_D: "grey",
    UNOWN_E: "grey",
    UNOWN_F: "grey",
    UNOWN_G: "grey",
    UNOWN_H: "grey",
    UNOWN_I: "grey",
    UNOWN_J: "grey",
    UNOWN_K: "grey",
    UNOWN_L: "grey",
    UNOWN_M: "grey",
    UNOWN_N: "grey",
    UNOWN_O: "grey",
    UNOWN_P: "grey",
    UNOWN_Q: "grey",
    UNOWN_R: "grey",
    UNOWN_S: "grey",
    UNOWN_T: "grey",
    UNOWN_U: "grey",
    UNOWN_V: "grey",
    UNOWN_W: "grey",
    UNOWN_X: "grey",
    UNOWN_Y: "grey",
    UNOWN_Z: "grey"
  };
  return genderMap[gender];
};

export const mapVariantToContent = (variant: Variant) => {
  const variantMap = {
    PARTY_HAT: "Party Hat",
    SANTA_HAT: "Santa Hat",
    ASH_HAT: "Ash's Hat",
    WITCH_HAT: "Witch Hat"
  };
  return variantMap[variant];
};

export const hasEvolutions = (evolutions: Evolutions) =>
  Object.keys(evolutions).length > 0;
