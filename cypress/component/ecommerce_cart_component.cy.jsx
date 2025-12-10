/// <reference types="cypress" />
import React from "react";
import { mount } from "cypress/react";
import Ecommerce from "../../src/components/Ecommerce";

describe("<Ecommerce /> Component Test", () => {
  it("mounts the Ecommerce page and shows empty cart", () => {
    mount(<Ecommerce />);

    // Page loads
    cy.get("[data-testid='ecommerce-page']").should("exist");

    // Empty cart text should appear
    cy.get("[data-testid='cart']").contains("Your cart is empty.");
  });
});
