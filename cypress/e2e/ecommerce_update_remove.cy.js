// Author: Muhammad Asfand Yar Khan

describe("E-commerce Store — Update Quantity & Remove Item", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/ecommerce"); // adjust route if needed
    });
  
    it("updates item quantity and removes it from the cart", () => {
      // Add one product to cart
      cy.get("[data-testid='add-to-cart']").first().click();
  
      // Ensure cart has item
      cy.get("[data-testid='cart-item']").should("have.length", 1);
  
      // Increase quantity
      cy.get("[data-testid='cart-item']")
        .find("input[type='number']")
        .clear()
        .type("3")
        .blur();
  
      // Ensure quantity updated in UI
      cy.get("[data-testid='cart-item']")
        .contains("× 3")
        .should("exist");
  
      // Remove item
      cy.get("[data-testid='remove-item']").click();
  
      // Ensure cart is empty
      cy.get("[data-testid='cart']").contains("Your cart is empty.").should("exist");
    });
  });
  