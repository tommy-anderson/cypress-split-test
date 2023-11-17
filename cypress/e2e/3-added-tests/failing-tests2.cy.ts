describe("all fail", () => {
  it("fails after 100 ms 1", { tags: ["added"] }, () => {
    cy.wait(100);
    expect(true).to.equal(false);
  });
  it("fails after 100 ms 2", { tags: ["added"] }, () => {
    cy.wait(100);
    expect(true).to.equal(false);
  });
  it("fails after 100 ms 3", { tags: ["added"] }, () => {
    cy.wait(100);
    expect(true).to.equal(false);
  });
});
describe("some fail", () => {
  it("does not fail after 100 ms 1", { tags: ["added"] }, () => {
    cy.wait(100);
    expect(true).to.equal(true);
  });
  it("fails after 100 ms 1", { tags: ["added"] }, () => {
    cy.wait(100);
    expect(true).to.equal(false);
  });
});
describe("all succeed", () => {
  it("does not fail after 100 ms 1", { tags: ["added"] }, () => {
    cy.wait(100);
    expect(true).to.equal(true);
  });
  it("does not fail after 100 ms 2", { tags: ["added"] }, () => {
    cy.wait(100);
    expect(true).to.equal(true);
  });
  it("does not fail after 100 ms 3", { tags: ["added"] }, () => {
    cy.wait(100);
    expect(true).to.equal(true);
  });
});
