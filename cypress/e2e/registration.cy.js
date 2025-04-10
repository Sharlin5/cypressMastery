//https://parabank.parasoft.com/parabank/register.htm

/// <reference types ="cypress" />

describe('Registration test flow', () => {
    beforeEach(() => {
        cy.visit('https://parabank.parasoft.com/parabank/register.htm')
        //clean database everyrun
        cy.get('.leftmenu > :nth-child(6) > a').click()
        cy.get(':nth-child(1) > form > .form2 > tbody > tr > :nth-child(2)').click()
        cy.visit('https://parabank.parasoft.com/parabank/register.htm')
    })

    it('Should successfully register the user', () => {
        cy.register()
    })

    it('Should successfully login with registered user', () => {
        cy.register()

        cy.get('#leftPanel > ul > :nth-child(8) > a').should('be.visible').click()
        cy.get('#loginPanel > form > :nth-child(2)').type('Johnny2')
        cy.get(':nth-child(4) > .input').type('password123')
        cy.get(':nth-child(5) > .button').should('be.visible').click()
    })
})