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

const evolutionPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  candy: PropTypes.number.isRequired,
  item: PropTypes.string
});

export const pokemonPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  seen: PropTypes.bool.isRequired,
  amazing: PropTypes.bool.isRequired,
  regional: PropTypes.bool,
  legendary: PropTypes.bool,
  genders: PropTypes.shape(genderPropTypes).isRequired,
  variants: PropTypes.shape(variantPropTypes),
  usesCandy: PropTypes.number.isRequired,
  evolvesInto: PropTypes.arrayOf(evolutionPropTypes)
});

export { genderPropTypes, variantPropTypes };
