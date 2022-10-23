//  Order us important

export const isEmptyValue = value => {
  return !value
    ? true
    : (typeof value === 'number' || typeof value === 'string') && value
    ? false
    : Array.isArray(value) && value.length < 1
    ? true
    : Object.keys(value) < 1
    ? true
    : false;
};