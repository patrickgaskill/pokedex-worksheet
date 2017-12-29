export const formatPokemonNumber = id => `#${id.toString().padStart(3, "0")}`;

export const mapGenderToContent = gender => {
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

export const mapGenderToIcon = gender => {
  switch (gender) {
    case "MALE":
    case "MALE_SHINY":
      return "man";
    case "FEMALE":
    case "FEMALE_SHINY":
      return "woman";
    case "GENDERLESS":
    case "GENDERLESS_SHINY":
      return "genderless";
    default:
      return undefined;
  }
};

export const mapGenderToColor = gender => {
  switch (gender) {
    case "MALE":
    case "MALE_SHINY":
      return "blue";
    case "FEMALE":
    case "FEMALE_SHINY":
      return "pink";
    case "GENDERLESS":
    case "GENDERLESS_SHINY":
      return "grey";
    default:
      return undefined;
  }
};

export const mapVariantToContent = variant => {
  const variantMap = {
    PARTY_HAT: "Party Hat",
    SANTA_HAT: "Santa Hat",
    ASH_HAT: "Ash's Hat",
    WITCH_HAT: "Witch Hat"
  };
  return variantMap[variant];
};

export const hasEvolutions = evolutions => Object.keys(evolutions).length > 0;
