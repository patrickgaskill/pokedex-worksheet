export const formatPokemonNumber = id => `#${id.toString().padStart(3, "0")}`;

export const mapGenderToContent = gender => {
  switch (gender) {
    case "male":
      return "Male";
    case "maleShiny":
      return "Shiny Male";
    case "female":
      return "Female";
    case "femaleShiny":
      return "Shiny Female";
    case "genderless":
      return "Genderless";
    case "genderlessShiny":
      return "Shiny Genderless";
    default:
      return gender.toUpperCase();
  }
};

export const mapGenderToIcon = gender => {
  switch (gender) {
    case "male":
    case "maleShiny":
      return "man";
    case "female":
    case "femaleShiny":
      return "woman";
    case "genderless":
    case "genderlessShiny":
      return "genderless";
    default:
      return null;
  }
};

export const mapGenderToColor = gender => {
  switch (gender) {
    case "male":
    case "maleShiny":
      return "blue";
    case "female":
    case "femaleShiny":
      return "pink";
    case "genderless":
    case "genderlessShiny":
      return "grey";
    default:
      return "grey";
  }
};

export const mapVariantToContent = variant => {
  switch (variant) {
    case "party":
      return "Party Hat";
    case "santa":
      return "Santa Hat";
    case "ash":
      return "Ash's Hat";
    case "witch":
      return "Witch Hat";
    default:
      return null;
  }
};
