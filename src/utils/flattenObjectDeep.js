export const flattenObjectDeep = object => {
  const obj = { ...object };
  let newObj = {};
  for (const i in obj) {
    if (typeof obj[i] === 'object' && obj[i] !== null && !Array.isArray(obj[i])) {
      const temp = flattenObjectDeep(obj[i]);
      for (const j in temp) {
        newObj[j] = temp[j];
      }
    } else {
      newObj[i] = obj[i];
    }
  }
  return newObj;
};
