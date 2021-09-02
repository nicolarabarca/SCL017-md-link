const isValidLink = require("./../logic").isValidLink;

describe("Testing from mdLinks project", () => {
  test("should return true when link is a valid link", async () => {
    const expectedResult = true;
    const actualResult = await isValidLink("https://www.google.cl");
    expect(actualResult).toBe(expectedResult);
  });
});
