import PropTypes from "prop-types";

const genderColors = {
  male: "#2196F3",
  female: "#E91E63",
  genderless: "#212121",
  unown: "#212121",
  disabled: "#9E9E9E",
  shiny: "#FFC107"
};

const possibleGenders = [
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

const genders = {};
for (const g of possibleGenders) {
  genders[g] = PropTypes.bool;
}
const genderPropTypes = PropTypes.shape(genders);

export { genderColors, possibleGenders, genderPropTypes };
