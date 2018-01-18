export const countTrueValues = (o: {}, callback?: mixed => boolean) =>
  Object.values(o).filter(el => (callback ? callback(el) : Boolean(el))).length;
