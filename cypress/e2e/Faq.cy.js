describe("FAQ page", () => {
  it("navigates to FAQ and shows content", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-cy="nav-faq"]').click();
    cy.url().should("include", "/faq");
    cy.contains("FAQ").should("be.visible");
  });
});
