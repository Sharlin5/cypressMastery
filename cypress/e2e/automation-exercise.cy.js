/// <reference types ="cypress" />

describe('Automation Excercise Tests', () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com/')
        cy.url().should('contain', 'automationexercise.com')
        cy.clearAllLocalStorage()
    })

    it('Place Order: Register while checkout', () => {
        // add 1 product
        cy.addProduct()

        // checks cart
        cy.get('.modal-body > :nth-child(2)').should('be.visible').and('contain', 'View Cart').click()
        cy.url().should('include', '/view_cart')
        // click checkout
        cy.get('a.btn.btn-default.check_out').should('be.visible').and('contain', 'Proceed To Checkout').click();
        // register
        // click register
        cy.get('.modal-body > :nth-child(2) > a > u').click()
    
        cy.register2()
        
        cy.checkout2()

        cy.contains('Delete Account').click();
        cy.get('[data-qa="continue-button"]').click();
    })

    it('Place Order: Register before checkout', () => {
        // go to register page
        //cy.contains('Cart').click()
        cy.contains('Signup / Login').click()
        // register
        cy.register2()
        // checkout
        cy.addProduct()

        cy.checkout2()

        cy.contains('Delete Account').click();
        cy.get('[data-qa="continue-button"]').click();
    })

    it('Place Order: Login before checkout', () => {
        // signup
        cy.contains('Signup / Login').click()
        // register
        cy.register2()
        // logout
        cy.contains('Logout').click()
        // login
        cy.contains('Signup / Login').click()
        cy.login2()

        cy.addProduct()

        cy.checkout2()

        cy.contains('Delete Account').click();
        cy.get('[data-qa="continue-button"]').click();
    })
})
