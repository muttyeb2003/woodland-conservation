import React from "react";
import FAQ from "../../src/components/FAQ";

describe("<FAQ />", () => {
  it("renders FAQ heading and at least one FAQ question", () => {
    cy.mount(<FAQ />);

    // Check that the FAQ heading is visible after rendering
    cy.contains(/faq/i).should("be.visible");

    // Check that at least one FAQ question appears in the component
    cy.contains(/what/i).should("exist");
  });
});
