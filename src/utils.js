export const formatPokemonNumber = (number: number) =>
  "#" + number.toString().padStart(3, "0");

export const countTrueValues = (o: {}, callback?: mixed => boolean) =>
  Object.values(o).filter(el => (callback ? callback(el) : Boolean(el))).length;
