describe('E-commerce test flow', () => {
    // It will run before each test case (it block)
   /*if matagal mag run ang test
    * 1.possible na slow internet 
      2.mabagal ang test environment
      3. down yung Server (API, DB etc.)*/
   beforeEach(() => {
    cy.auth('standard_user', 'secret_sauce')
   });
 
   it('Should successfully login', () => {
     // Verify we're on the inventory page after login
     cy.url().should('include', '/inventory.html')
     cy.get('.inventory_list').should('be.visible')
     cy.screenshot()
   });
 
   it('Should successfully add to cart', () => {
     // Add first product to cart
     cy.addtocart()
     // Verify cart badge appears with 1 item
     // Optionally, navigate to the cart and verify item is listed
     cy.checkcart()
     cy.screenshot()
   });

   it('Should successfully checkout', () => {
    // Add first product to cart
    cy.addtocart()

    // Navigate to cart
    cy.checkcart()

    // Verify that there checkout is possible
    cy.checkout()
    cy.screenshot()

    cy.get('[data-test="back-to-products"]').should('be.visible').click()
    cy.url().should('include', 'inventory.html')
   })
 });