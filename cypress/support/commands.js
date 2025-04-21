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
import { generateUserData } from "./fakersutils";
import RegistrationPage  from "./pages/registration.page";
import autoexregPage from "./pages/autoexreg.page";

// create faker
const userData = generateUserData()
// cart.cy.js
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

// registration.cy.js
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

// cart-persistent.cy.js
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

// automation-exercise.cy.js
  Cypress.Commands.add('register2', () => {
    cy.fixture('user.json').then((user) => {
        // should be in login page
        cy.url().should('include', '/login')
        cy.get('[data-qa="signup-name"]').should('be.visible').type(user.name).should('have.value', user.name)
        cy.get('[data-qa="signup-email"]').should('be.visible').type(user.email).should('have.value', user.email)
        cy.get('[data-qa="signup-button"]').should('be.visible').and('contain','Signup').click()
        // register
        //cy.url().should('include', '/')
        if(user.gender == 1){
            // Mr
            cy.get('#uniform-id_gender1').should('be.visible').click()
        } else if (user.gender == 2){
            // Mrs
            cy.get('#uniform-id_gender2').should('be.visible').click()
        }
        cy.get('[data-qa="name"]').should('be.visible').and('have.value', user.name);
        cy.get('[data-qa="email"]').should('be.visible').and('have.value', user.email);
        cy.get('[data-qa="password"]').should('be.visible').type(user.password)
        cy.get('[data-qa="days"]').select(user.day)
        cy.get('[data-qa="months"]').select(user.month)
        cy.get('[data-qa="years"]').select(user.year)

        cy.get('#newsletter').click()
        cy.get('#optin').click()

        cy.get('[data-qa="first_name"]').type(user.firstName).should('have.value', user.firstName)
        cy.get('[data-qa="last_name"]').type(user.lastName).should('have.value', user.lastName)
        cy.get('[data-qa="company"]').type(user.company).should('have.value', user.company)
        cy.get('[data-qa="address"]').type(user.address).should('have.value', user.address)
        cy.get('[data-qa="address2"]').type(user.address2).should('have.value', user.address2)
        cy.get('[data-qa="country"]').select(user.country).should('have.value', user.country)
        cy.get('[data-qa="state"]').type(user.state).should('have.value', user.state)
        cy.get('[data-qa="city"]').type(user.city).should('have.value', user.city)
        cy.get('[data-qa="zipcode"]').type(user.zipcode).should('have.value', user.zipcode)
        cy.get('[data-qa="mobile_number"]').type(user.mobileNum).should('have.value', user.mobileNum)
        // create the account
        cy.get('[data-qa="create-account"]').should('be.visible').click()
        cy.dynamicfilename('Account-created')
        // goes to home page
        cy.get('[data-qa="continue-button"]').should('be.visible').click()
        cy.get('b').should('contain', user.name)
        cy.dynamicfilename('Return-to-home-after-reg')
    })
  })

  Cypress.Commands.add('addProduct', () => {
    cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo').should('be.visible').trigger('mouseover')
    cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').should('be.visible').click()
    cy.wait(1000)
    cy.get('.modal-body > :nth-child(2)').should('be.visible').and('contain', 'View Cart').click()
    cy.url().should('include', '/view_cart')
    cy.dynamicfilename('Product-added')
  })

  Cypress.Commands.add('checkout2', () => {
    // check cart contains 1
    //cy.contains('Cart').click()
    //cy.url().should('include', '/view_cart')
    cy.get('tr#product-1').should('exist') 
    // click checkout
    cy.get('a.btn.btn-default.check_out').should('be.visible').and('contain', 'Proceed To Checkout').click();
    // verify details
    cy.verifyDetails('delivery')
    cy.verifyDetails('invoice')
    cy.get('.form-control').should('be.visible').type('Testing if comment works')
    // place order
    cy.contains('Place Order').click();
    cy.fixture('user.json').then((user) => {
        cy.get('[data-qa="name-on-card"]').should('be.visible').type(user.name)
        cy.get('[data-qa="card-number"]').should('be.visible').type(user.cardNum)
        cy.get('[data-qa="cvc"]').should('be.visible').type(user.cvc)
        cy.get('[data-qa="expiry-month"]').should('be.visible').type(user.endMonth)
        cy.get('[data-qa="expiry-year"]').should('be.visible').type(user.endYear)
        cy.get('[data-qa="pay-button"]').should('be.visible').click()
        cy.dynamicfilename('Checkout success')
        cy.url().should('include', '/payment_done')
        cy.get('[data-qa="continue-button"]').click()
    })
    cy.url().should('contain', 'automationexercise.com')
  })

  Cypress.Commands.add('verifyDetails', (type) => {
    cy.fixture('user.json').then((user) => {
    cy.get(`#address_${type} > .address_firstname`).should('contain', `${user.title} ${user.firstName} ${user.lastName}`);
    cy.get(`#address_${type} > :nth-child(3)`).should('contain', user.company);
    cy.get(`#address_${type} > :nth-child(4)`).should('contain', user.address);
    cy.get(`#address_${type} > :nth-child(5)`).should('contain', user.address2);

    cy.get(`#address_${type} > .address_city`).should('contain', user.city);
    cy.get(`#address_${type} > .address_state_name`).should('contain', user.state);
    cy.get(`#address_${type} > .address_postcode`).should('contain', user.zipcode);

    cy.get(`#address_${type} > .address_country_name`).should('contain', user.country);
    cy.get(`#address_${type} > .address_phone`).should('contain', user.mobileNum);
    })
  })

  Cypress.Commands.add('login2', () => {
    cy.fixture('user.json').then((user) => {
        cy.get('[data-qa="login-email"]').should('be.visible').type(user.email)
        cy.get('[data-qa="login-password"]').should('be.visible').type(user.password)
        cy.get('[data-qa="login-button"]').should('be.visible').click()
        // check correct user
        cy.get('b').should('contain', user.name)
        cy.dynamicfilename('Successful-Login')
    })
  })

  // pages
  Cypress.Commands.add('fillRegistrationForm', () => {
    const customerData = generateCustomerData();
    RegistrationPage.fillSignUpForm(customerData);
    RegistrationPage.submitSignUpForm();
    RegistrationPage.verifySignUpSuccess(customerData.username);
  });
  
  // test pages functions
  Cypress.Commands.add('AETests', () => {
    autoexregPage.fillSignUpForm()
    autoexregPage.submitRegisterForm()
  })