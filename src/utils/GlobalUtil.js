const dateTimeConvert = (milliseconds) => {
  const date = new Date(milliseconds);
  return (
    date.getDate() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getUTCFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes()
  );
};

const dateConvert = (milliseconds) => {
  const date = new Date(milliseconds);
  return (
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getUTCFullYear()
  );
};

const commas = (str) => {
  return str.replace(/.(?=(?:.{3})+$)/g, "$&.");
};

export const GlobalUtil = {
  dateTimeConvert,
  dateConvert,
  commas,
};
