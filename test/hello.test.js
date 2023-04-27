const { hello } = require("../src/functions/hello/handler");

describe("hello function", () => {
  it("returns a greeting message", async () => {
    const response = await hello();
    expect(response.statusCode).toEqual(200);
  });
});