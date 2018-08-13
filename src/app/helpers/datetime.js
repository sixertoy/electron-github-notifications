export const datetime = value => {
  const date = new Date(value);
  const day = date.toLocaleDateString('fr-FR', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    weekday: 'long',
  });
  const time = date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${day} à ${time}`;
};

export default datetime;
