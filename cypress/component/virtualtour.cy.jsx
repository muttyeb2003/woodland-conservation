import React from "react";
import VirtualTour from "../../src/components/VirtualTour";
import { mount } from "cypress/react";

describe("VirtualTour Component", () => {
    it("renders the title and first slide caption", () => {
        mount(<VirtualTour />);

        // Title should appear
        cy.contains("Virtual Tour of the Woodland").should("be.visible");

        // First caption should appear
        cy.contains("Twisted understory").should("be.visible");
    });
});
