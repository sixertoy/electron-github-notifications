export const sortByName = items => {
  const copy = [].concat(items);
  copy.sort((a, b) => {
    const namea = a.name.toLocaleLowerCase();
    const nameb = b.name.toLocaleLowerCase();
    if (namea > nameb) return 1;
    if (nameb > namea) return -1;
    return 0;
  });
  return copy;
};

export default sortByName;
