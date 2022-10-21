export const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
// export const camelToLetterCase = str => str.replace(/[A-Z]/g, letter => ` ${letter.toLowerCase()}`);

export const camelToLetterCase = str => {
  const result = str.replace(/([A-Z])/g, ' $1').toLowerCase();
  return result.charAt(0).toUpperCase() + result.slice(1);
};
