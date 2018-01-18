export const formatPokemonNumber = (number: number) =>
  "#" + number.toString().padStart(3, "0");

export const hasTrueValue = (o: {}) => o && Object.values(o).includes(true);

export const countTrueValues = (o: {}, callback?: mixed => boolean) =>
  Object.values(o).filter(v => (callback ? callback(v) : Boolean(v))).length;

export const hasKeys = (o: {}) => Object.keys(o).length > 0;
