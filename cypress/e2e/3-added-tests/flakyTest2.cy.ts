import { randomBool } from "./utils";

describe("First describe", { tags: ["flaky"] }, () => {
  it("succeeds", () => {
    expect(true).to.equal(true);
  });
  it("can be flaky", () => {
    expect(randomBool()).to.equal(true);
    expect(randomBool()).to.equal(true);
  });
  it("fails", () => {
    expect(false).to.equal(true);
  });
});
describe("Second describe", { tags: ["flaky"] }, () => {
  it("succeeds", () => {
    expect(true).to.equal(true);
  });
  it("can be flaky", () => {
    expect(randomBool()).to.equal(true);
    expect(randomBool()).to.equal(true);
  });
  it("fails", () => {
    expect(false).to.equal(true);
  });
});
describe("Third describe", { tags: ["flaky"] }, () => {
  it("succeeds", () => {
    expect(true).to.equal(true);
  });
  it("can be flaky", () => {
    expect(randomBool()).to.equal(true);
    expect(randomBool()).to.equal(true);
  });
  it("fails", () => {
    expect(false).to.equal(true);
  });
});