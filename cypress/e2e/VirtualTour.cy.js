describe("Virtual Tour Page", () => {
  it("shows slideshow and navigation arrows", () => {
    cy.visit("http://localhost:3000/virtualtour");

    cy.contains("Virtual Tour of the Woodland").should("be.visible");

    cy.contains("❮").should("exist");  // previous button
    cy.contains("❯").should("exist");  // next button
  });
});
