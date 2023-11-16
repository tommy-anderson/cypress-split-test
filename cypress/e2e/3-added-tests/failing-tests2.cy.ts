describe("some fail", { tags: ["added"] }, () => {
  it("fails after 1 second", () => {
    cy.wait(1000);
    expect(true).to.equal(false);
  });
  it("fails after 2 second", () => {
    cy.wait(1000);
    expect(true).to.equal(false);
  });
  it("succeeds after 1 second", () => {
    cy.wait(1000);
    expect(true).to.equal(true);
  });
});
describe("all fail", { tags: ["added"] }, () => {
  it("fails after 1 second", () => {
    cy.wait(1000);
    expect(true).to.equal(false);
  });
  it("fails after 1 second", () => {
    cy.wait(1000);
    expect(true).to.equal(false);
  });
  it("fails after 1 second", () => {
    cy.wait(1000);
    expect(true).to.equal(false);
  });
});
