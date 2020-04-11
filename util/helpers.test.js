const {
  isValidUrlFormat,
  getUrlHost,
} = require("./helpers");

it("should return false when given a wrong http protocol", () => {
  const result = isValidUrlFormat("hds://www.google.com");
  const expected = false;
  expect(result).toBe(expected);
});

it("should return false when given no http/https protocol", () => {
  const result = isValidUrlFormat("www.google.com");
  const expected = false;
  expect(result).toBe(expected);
});

it("should return true when given a correctly formatted url with https", () => {
  const result = isValidUrlFormat("https://www.google.com");
  const expected = true;
  expect(result).toBe(expected);
});

it("should return true when given a correctly formatted url with http", () => {
  const result = isValidUrlFormat("http://www.google.com");
  const expected = true;
  expect(result).toBe(expected);
});

it("should return the host of the url without the http(s) protocol", () => {
  const result = getUrlHost("https://www.google.com");
  const expected = "google.com";
  expect(result).toBe(expected);
});
