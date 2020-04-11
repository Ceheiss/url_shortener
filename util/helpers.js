const dns = require("dns");


 
const isValidUrlFormat = (url) => {
  const regex = /https?:\/\/www.*.[a-z]\/?.*/gi;
  return regex.test(url);
};

const getUrlHost = (url) => {
  const regex = /https?:\/\/www\./gi;
  return url.split(regex)[1];
};

module.exports = {  isValidUrlFormat, getUrlHost };
