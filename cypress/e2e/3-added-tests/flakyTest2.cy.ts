import { randomBool } from "./utils";

describe("First describe", { tags: ["flaky"] }, () => {
  it("succeeds", () => {
    expect(true).to.equal(true);
  });
  it("can be flaky", () => {
    expect(randomBool()).to.equal(true);
    expect(randomBool()).to.equal(true);
  });
});
