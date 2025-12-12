describe("Ecosystem Quiz E2E", () => {
  beforeEach(() => {
    cy.visit("/ecosystem");
  });

  it("lets a visitor answer questions, see results, and retry", () => {
    cy.get('[data-cy="question-text"]').should(
      "contain",
      "What is one of the most common tree species in the Halifax woodlands?"
    );
    cy.contains('[data-cy="option"]', "Spruce").click();
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="submit-button"]').should("contain", "Next Question");
    cy.get('[data-cy="submit-button"]').click();

    cy.get('[data-cy="question-text"]').should(
      "contain",
      "Which protected area is known for its forest trails near Halifax?"
    );
    cy.get('[data-cy="progress-text"]').should("contain", "Question 2 of 10");

    // finish remaining questions quickly
    for (let i = 0; i < 8; i += 1) {
      cy.get('[data-cy="option"]').first().click();
      cy.get('[data-cy="submit-button"]').click();
      cy.get('[data-cy="submit-button"]').click();
    }

    cy.get('[data-cy="results-screen"]').should("be.visible");
    cy.contains("You scored").should("be.visible");

    cy.get('[data-cy="retry-button"]').click();
    cy.get('[data-cy="question-text"]').should(
      "contain",
      "What is one of the most common tree species in the Halifax woodlands?"
    );
    cy.get('[data-cy="progress-text"]').should("contain", "Question 1 of 10");
  });
});
