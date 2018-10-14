export const locationToArray = path => {
  const splitted = path.split('/').filter(v => v);
  return splitted;
};

export default locationToArray;
