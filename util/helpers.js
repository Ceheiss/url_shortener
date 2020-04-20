const isValidUrlFormat = (url) => {
  const regex = /https?:\/\/w?w?w?.*.[a-z]\/?.*/gi;
  return regex.test(url);
};

const getUrlHost = (url) => {
  const initialPartRegex = /https?:\/\//gi;
  const endingPartRegex = /\//gi;
  const firstPartOff = url.split(initialPartRegex)[1];
  const appendPartOff = firstPartOff.split(endingPartRegex)[0];
  return appendPartOff;
};

module.exports = { isValidUrlFormat, getUrlHost };