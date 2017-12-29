import PropTypes from "prop-types";

const possibleGenders = [
  "MALE",
  "FEMALE",
  "MALE_SHINY",
  "FEMALE_SHINY",
  "GENDERLESS",
  "GENDERLESS_SHINY",
  "UNOWN_A",
  "UNOWN_B",
  "UNOWN_C",
  "UNOWN_D",
  "UNOWN_E",
  "UNOWN_F",
  "UNOWN_G",
  "UNOWN_H",
  "UNOWN_I",
  "UNOWN_J",
  "UNOWN_K",
  "UNOWN_L",
  "UNOWN_M",
  "UNOWN_N",
  "UNOWN_O",
  "UNOWN_P",
  "UNOWN_Q",
  "UNOWN_R",
  "UNOWN_S",
  "UNOWN_T",
  "UNOWN_U",
  "UNOWN_V",
  "UNOWN_W",
  "UNOWN_X",
  "UNOWN_Y",
  "UNOWN_Z"
];

const genderPropTypes = {};
for (const g of possibleGenders) {
  genderPropTypes[g] = PropTypes.bool;
}

const possibleVariants = ["PARTY_HAT", "SANTA_HAT", "ASH_HAT", "WITCH_HAT"];

const variantPropTypes = {};
for (const v of possibleVariants) {
  variantPropTypes[v] = PropTypes.bool;
}

const possibleItems = [
  "SUN_STONE",
  "KINGS_ROCK",
  "DRAGON_SCALE",
  "METAL_COAT",
  "UP-GRADE"
];

const evolutionPropType = PropTypes.shape({
  candy: PropTypes.number.isRequired,
  item: PropTypes.oneOf(possibleItems)
});

const pokedexEntryPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  genders: PropTypes.arrayOf(PropTypes.oneOf(possibleGenders)).isRequired,
  variants: PropTypes.arrayOf(PropTypes.oneOf(possibleVariants)).isRequired,
  evolutions: PropTypes.arrayOf(evolutionPropType).isRequired,
  candyType: PropTypes.number.isRequired,
  isLegendary: PropTypes.bool.isRequired,
  isRegional: PropTypes.bool.isRequired
});

const pokedexPropType = PropTypes.objectOf(pokedexEntryPropType);

const collectionEntryPropType = PropTypes.shape({
  isSeen: PropTypes.bool,
  hasAmazing: PropTypes.bool,
  gendersCaught: PropTypes.objectOf(PropTypes.bool),
  variantsCaught: PropTypes.objectOf(PropTypes.bool)
});

const collectionPropType = PropTypes.objectOf(collectionEntryPropType);

export {
  possibleGenders,
  genderPropTypes,
  possibleVariants,
  variantPropTypes,
  pokedexEntryPropType,
  pokedexPropType,
  collectionEntryPropType,
  collectionPropType
};
