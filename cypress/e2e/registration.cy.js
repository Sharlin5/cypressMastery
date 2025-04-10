//https://parabank.parasoft.com/parabank/register.htm

/// <reference types ="cypress" />

import { generateCustomerData } from "../support/fakersutils"

describe('Registration test flow', () => {
    const fakeUser = generateCustomerData()

    beforeEach(() => {
        cy.visit('https://parabank.parasoft.com/parabank/register.htm')
        //clean database everyrun
        cy.get('.leftmenu > :nth-child(6) > a').click()
        cy.get(':nth-child(1) > form > .form2 > tbody > tr > :nth-child(2)').click()
        cy.visit('https://parabank.parasoft.com/parabank/register.htm')
    })

    it('Should successfully register the user', () => {
        cy.register(0)
    })

    it('Should successfully register the user with faker', () => {
        cy.registerFaker(fakeUser)
    })

    it('Should successfully login with registered user', () => {
        cy.register(0)
        cy.login(0)
    })

    it('Should successfully login with registered fake user', () => {
        cy.registerFaker(fakeUser)
        cy.loginFaker(fakeUser)
    })

    it('Should successfully logout with registered user after login', () => {
        cy.register(0)

        cy.login(0)

        cy.get('#leftPanel > ul > :nth-child(8) > a').should('be.visible').click()
        
    })
})