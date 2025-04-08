// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('auth', (username, password) =>{
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type("standard_user")
    cy.get('[data-test="password"]').type("secret_sauce")
    cy.get('[data-test="login-button"]').click()
})

Cypress.Commands.add('addtocart', () => {
    // Add first product to cart
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
    .should('be.visible')
    .click()
})

Cypress.Commands.add('checkcart',() => {
    cy.get('.shopping_cart_badge').should('contain', '1')
    cy.get('.shopping_cart_link').click()
    cy.url().should('include', '/cart.html')
    cy.get('.cart_item').should('have.length', 1)
    cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack')
})

Cypress.Commands.add('checkout',() => {
    cy.get('[data-test="checkout"]').should('be.visible').click()
    cy.url().should('include', 'checkout-step-one.html')
    cy.get('[data-test="firstName"]').should('be.visible').type('Sharlin')
    cy.get('[data-test="lastName"]').should('be.visible').type('Tang')
    cy.get('[data-test="postalCode"]').should('be.visible').type('1440')
    cy.get('[data-test="continue"]').should('be.visible').click()
    cy.url().should('include', 'checkout-step-two.html')
    cy.get('[data-test="finish"]').should('be.visible').click()
    cy.url().should('include', 'checkout-complete.html')
})

Cypress.Commands.add('dynamicfilename', (prefix) => {
    const todaydate = new Date()
    const formattedDate = `${String(todaydate.getMonth()+1).padStart(2, '0')}-${String(todaydate.getDate()).padStart(2, '0')}-${String(todaydate.getFullYear()).slice(-2)}`;
    const fileName = `${prefix}-${formattedDate}`;
    cy.screenshot(fileName);
})
