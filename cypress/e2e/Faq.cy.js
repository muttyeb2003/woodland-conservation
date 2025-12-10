describe("FAQ page - upvote functionality", () => {
  it("increases the upvote count when clicked", () => {
    cy.visit("http://localhost:3000/faq");

    // Get the first upvote button
    cy.get('[data-cy="faq-upvote"]').first()
      .then(($button) => {
        const initialText = $button.text();

        // Click the button
        cy.wrap($button).click();

        // After clicking, the number should be different
        cy.get('[data-cy="faq-upvote"]').first().should(($newButton) => {
          const newText = $newButton.text();
          expect(newText).to.not.equal(initialText);
        });
      });
  });
});
