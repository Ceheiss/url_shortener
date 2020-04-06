const dns = require("dns");
const dnsPromises = dns.promises;

const urlValidityChecker = (url) =>
  dns.lookup(url, (err, address) => {
    if (err) {
      return false;
    } else {
      console.log(typeof address)
      return true;
    }
  });

  if (typeof urlValidityChecker("google.com") ===  "string") () => console.log("FUNCIONA")
  if (typeof urlValidityChecker("saqads") === "string") () => console.log("NO FUNCIONA")

const isValidUrlFormat = (url) => {
  const regex = /https?:\/\/www.*.[a-z]\/?.*/gi;
  return regex.test(url);
};

const getUrlHost = (url) => {
  const regex = /https?:\/\/www\./gi;
  return url.split(regex)[1];
};

module.exports = { urlValidityChecker, isValidUrlFormat, getUrlHost };
