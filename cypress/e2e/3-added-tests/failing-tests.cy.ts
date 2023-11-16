describe("some fail", () => {
  it("fails after 1 second", { tags: ["added"] }, () => {
    cy.wait(1000);
    expect(true).to.equal(false);
  });
  it("fails after 2 second", { tags: ["added"] }, () => {
    cy.wait(1000);
    expect(true).to.equal(false);
  });
  it("succeeds after 1 second", { tags: ["added"] }, () => {
    cy.wait(1000);
    expect(true).to.equal(true);
  });
});
describe("all fail", () => {
  it("fails after 1 second", { tags: ["added"] }, () => {
    cy.wait(1000);
    expect(true).to.equal(false);
  });
  it("fails after 1 second", { tags: ["added"] }, () => {
    cy.wait(1000);
    expect(true).to.equal(false);
  });
  it("fails after 1 second", { tags: ["added"] }, () => {
    cy.wait(1000);
    expect(true).to.equal(false);
  });
});
