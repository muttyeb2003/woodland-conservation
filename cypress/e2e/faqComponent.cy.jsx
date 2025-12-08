import React from "react";
import FAQ from "../../src/components/FAQ";

describe("<FAQ />", () => {
  it("renders FAQ heading and at least one FAQ question", () => {
    cy.mount(<FAQ />);
    cy.contains(/faq/i).should("be.visible");
    cy.contains(/what/i).should("exist");
  });
});
