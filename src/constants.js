import PropTypes from "prop-types";

export const possibleGenders = [
  "male",
  "female",
  "maleShiny",
  "femaleShiny",
  "genderless",
  "genderlessShiny",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];

const genderPropTypes = {};
for (const g of possibleGenders) {
  genderPropTypes[g] = PropTypes.bool;
}

export const possibleVariants = ["party", "santa", "ash", "witch"];

const variantPropTypes = {};
for (const v of possibleVariants) {
  variantPropTypes[v] = PropTypes.bool;
}

export { genderPropTypes, variantPropTypes };
