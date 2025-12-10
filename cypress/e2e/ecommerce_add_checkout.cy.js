// Author: Muhammad Asfand Yar Khan

describe("E-commerce Store — Add to Cart and Checkout", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/ecommerce"); // adjust route if needed
    });
  
    it("adds an item to the cart and completes checkout", () => {
      // Verify page loaded
      cy.get("[data-testid='ecommerce-page']").should("exist");
  
      // Click the first product's Add to Cart button
      cy.get("[data-testid='add-to-cart']").first().click();
  
      // Cart should show one item
      cy.get("[data-testid='cart-item']").should("have.length", 1);
  
      // Checkout button should now be enabled
      cy.get("[data-testid='checkout-btn']").should("not.be.disabled");
  
      // Complete checkout
      cy.get("[data-testid='checkout-btn']").click();
  
      // Summary should appear
      cy.get("[data-testid='checkout-summary']").should("be.visible");
  
      // Ensure total appears
      cy.get("[data-testid='checkout-summary']")
        .contains("Total")
        .should("exist");
    });
  });
  