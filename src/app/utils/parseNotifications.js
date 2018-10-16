const parseNotifications = (items, normalizer) =>
  items.reduce((acc, entries) => {
    const parsed = entries.data.map(normalizer);
    return [...acc, ...parsed];
  }, []);

export default parseNotifications;
