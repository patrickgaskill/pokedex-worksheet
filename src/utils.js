// @flow
export const formatPokemonNumber = (number: number) =>
  `#${number.toString().padStart(3, "0")}`;
