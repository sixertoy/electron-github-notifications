const opts = {
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  month: 'long',
  timeZone: 'Europe/Paris',
  weekday: 'long',
  year: 'numeric',
};
const formatzone = 'fr-FR';
const formatter = new Intl.DateTimeFormat(formatzone, opts);

export const datetime = value => {
  const date = new Date(value);
  return formatter.format(date);
};

export default datetime;
