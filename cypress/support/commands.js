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

/// <reference types ="cypress" />

import { generateCustomerData } from "./fakersutils";

Cypress.Commands.add('auth', (username, password) =>{
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type(username)
    cy.get('[data-test="password"]').type(password)
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
    cy.get('.inventory_item_name').should('be.visible').and('contain', 'Sauce Labs Backpack')
})

Cypress.Commands.add('checkout',() => {
    cy.get('[data-test="checkout"]').should('be.visible').click()
    cy.url().should('include', 'checkout-step-one.html')
    cy.dynamicfilename('checkout-one')
    cy.get('[data-test="firstName"]').should('be.visible').type('Sharlin')
    cy.get('[data-test="lastName"]').should('be.visible').type('Tang')
    cy.get('[data-test="postalCode"]').should('be.visible').type('1440')
    cy.get('[data-test="continue"]').should('be.visible').click()
    cy.url().should('include', 'checkout-step-two.html')
    cy.dynamicfilename('checkout-two')
    cy.get('[data-test="finish"]').should('be.visible').click()
    cy.url().should('include', 'checkout-complete.html')
    cy.dynamicfilename('checkout-complete')
})

Cypress.Commands.add('dynamicfilename', (prefix) => {
    const todaydate = new Date()
    const formattedDate = `${String(todaydate.getMonth()+1).padStart(2, '0')}-${String(todaydate.getDate()).padStart(2, '0')}-${String(todaydate.getFullYear()).slice(-2)}`;
    const filename = `${prefix}-${formattedDate}`;
    cy.screenshot(filename);
})

Cypress.Commands.add('register', (jsonSource) => {
    cy.readFile('cypress/fixtures/'+jsonSource).then((customers) => {
        cy.get('input[id="customer.firstName"]').type(customers.firstName)
        cy.get('input[id="customer.lastName"]').type(customers.lastName)
        cy.get('input[id="customer.address.street"]').type(customers.address)
        cy.get('input[id="customer.address.city"]').type(customers.city)
        cy.get('input[id="customer.address.state"]').type(customers.state)
        cy.get('input[id="customer.address.zipCode"]').type(customers.zipCode)
        cy.get('input[id="customer.phoneNumber"]').type(customers.phoneNumber)
        cy.get('input[id="customer.ssn"]').type(customers.ssn)
        cy.get('input[id="customer.username"]').type(customers.username)
        cy.get('input[id="customer.password"]').type(customers.password)
        cy.get('input[id="repeatedPassword"]').type(customers.password)
        cy.get('[colspan="2"] > .button').should('be.visible').click() //click register
        cy.contains(customers.username)
    })
})

Cypress.Commands.add('registerFaker', (userData) => {
    cy.get('input[id="customer.firstName"]').type(userData.firstName)
    cy.get('input[id="customer.lastName"]').type(userData.lastName)
    cy.get('input[id="customer.address.street"]').type(userData.address)
    cy.get('input[id="customer.address.city"]').type(userData.city)
    cy.get('input[id="customer.address.state"]').type(userData.state)
    cy.get('input[id="customer.address.zipCode"]').type(userData.zipCode)
    cy.get('input[id="customer.phoneNumber"]').type(userData.phoneNumber)
    cy.get('input[id="customer.ssn"]').type(userData.ssn)
    cy.get('input[id="customer.username"]').type(userData.username)
    cy.get('input[id="customer.password"]').type(userData.password)
    cy.get('input[id="repeatedPassword"]').type(userData.password)
    cy.get('[colspan="2"] > .button').should('be.visible').click() //click register
    cy.contains(userData.username)
})

Cypress.Commands.add('login', (jsonSource) => {
    cy.get('#leftPanel > ul > :nth-child(8) > a').should('be.visible').click()//logout
    cy.fixture(jsonSource).then((customers) => {
    cy.get('#loginPanel > form > :nth-child(2)').type(customers.username)
    cy.get(':nth-child(4) > .input').type(customers.password)
    })
    cy.get(':nth-child(5) > .button').should('be.visible').click()//login
})

Cypress.Commands.add('loginFaker', (userData) => {
    cy.get('#leftPanel > ul > :nth-child(8) > a').should('be.visible').click()//logout
    cy.get('#loginPanel > form > :nth-child(2)').type(userData.username)
    cy.get(':nth-child(4) > .input').type(userData.password)
    cy.get(':nth-child(5) > .button').should('be.visible').click()//login
})

Cypress.Commands.add('generateData' , () => {
    let testData = generateCustomerData()
    cy.writeFile('cypress/fixtures/testData.json', testData)
});

Cypress.Commands.add('saveCart', () => {
    cy.window().then((win) => {
      const cart = win.localStorage.getItem('cart-contents') || '[]';
      Cypress.env('savedCart', cart);
    });
  });

  Cypress.Commands.add('restoreCart', () => {
    const cart = Cypress.env('savedCart') || '[]';
    cy.window().then((win) => {
      win.localStorage.setItem('cart-contents', cart);
    });
  });
