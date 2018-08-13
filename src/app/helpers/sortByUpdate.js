export const sortByUpdate = (items, desc = true) => {
  const copy = [].concat(items);
  copy.sort((a, b) => {
    const datea = a.updated_at;
    const dateb = b.updated_at;
    if (datea > dateb) return desc ? -1 : 1;
    if (datea < dateb) return desc ? 1 : -1;
    return 0;
  });
  return copy;
};

export default sortByUpdate;
