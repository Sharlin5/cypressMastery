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

    //static user used
    it('Should successfully register the user', () => {
        cy.register('customers.json')
    })

    // fake user created on registration file
    it('Should successfully register the user with faker', () => {
        cy.registerFaker(fakeUser)
    })

    // data generated with faker and used with fixture
    it('Should successfully register with faker user using fixture', () => {
        cy.generateData()
        cy.register('testData.json')
    })

    // static user data used
    it('Should successfully login with registered user', () => {
        cy.register('customers.json')
        cy.login('customers.json')
    })

    // faker user
    it('Should successfully login with registered fake user', () => {
        cy.registerFaker(fakeUser)
        cy.loginFaker(fakeUser)
    })

    // data generated with faker and used with fixture
    it('Should successfully register with faker user using fixture', () => {
        cy.generateData()
        cy.wait(2000);
        cy.register('testData.json')
        cy.login('testData.json')
    })

    it('Should successfully logout with registered user after login', () => {
        cy.register('customers.json')
        cy.login('customers.json')
        cy.get('#leftPanel > ul > :nth-child(8) > a').should('be.visible').click()
        
    })
})