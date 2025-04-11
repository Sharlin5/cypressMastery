/// <reference types ="cypress" />

describe('Automation Excercise Tests', () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com/')
        cy.url().should('contain', 'automationexercise.com')
        cy.clearAllLocalStorage()
    })

    it('Place Order: Register while checkout', () => {
        cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo').should('be.visible').trigger('mouseover')
        cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').should('be.visible').click()
        cy.get('.modal-body > :nth-child(2)').should('be.visible').and('contain', 'View Cart').click()
        cy.url().should('include', '/view_cart')
        // click checkout
        cy.get('a.btn.btn-default.check_out').should('be.visible').and('contain', 'Proceed To Checkout').click();
        // click register
        cy.get('.modal-body > :nth-child(2) > a > u').click()
        // should be in login page
        cy.url().should('include', '/login')
        cy.get('[data-qa="signup-name"]').should('be.visible').type('Luca Live')
        cy.get('[data-qa="signup-email"]').should('be.visible').type('lucalive@email.com')
        cy.get('[data-qa="signup-button"]').should('be.visible').and('contain','Signup').click()
        // register
        cy.get('#uniform-id_gender1').should('be.visible').click() // select gender Mr
        cy.get('#uniform-id_gender2').should('be.visible').click()

        cy.get('[data-qa="name"]').should('be.visible').and('have.value', 'Luca Live');
        cy.get('[data-qa="email"]').should('be.visible').and('have.value', 'lucalive@email.com');
        cy.get('[data-qa="password"]').should('be.visible').type('password123')
        cy.get('[data-qa="days"]').select('1')
        //cy.get('#days').select('1').should('have.value', '1');
        /*cy.get('#days[data-qa="days"]').select('1').then(($dropdown) => {
            expect($dropdown.val()).to.equal('1');
        });*/
        cy.get('[data-qa="months"]').select('January')
        cy.get('[data-qa="years"]').select('2003')

        cy.get('#newsletter').click()

        cy.get('[data-qa="first_name"]').type('Luca')
        cy.get('[data-qa="last_name"]').type('Live')
        cy.get('[data-qa="company"]').type('Vertere')
        cy.get('[data-qa="address"]').type('123 leviste')
        cy.get('[data-qa="country"]').select('Australia')
        cy.get('[data-qa="state"]').type('idk')
        cy.get('[data-qa="city"]').type('Sydney')
        cy.get('[data-qa="zipcode"]').type('12345')
        cy.get('[data-qa="mobile_number"]').type('09123456789')

        cy.get('[data-qa="create-account"]').should('be.visible').click()
        
        cy.get('[data-qa="continue-button"]').should('be.visible').click()

        cy.contains('Cart').click()

        // click checkout
        cy.get('a.btn.btn-default.check_out').should('be.visible').and('contain', 'Proceed To Checkout').click();

        cy.contains('Delete Account').click();
    })

    it('Place Order: Register before checkout', () => {
        // go to register page
        cy.contains('Cart').click()


        // register
        /*cy.get('#uniform-id_gender1').should('be.visible').click() // select gender Mr
        cy.get('#uniform-id_gender2').should('be.visible').click()

        cy.get('[data-qa="name"]').should('be.visible').and('have.value', 'Luca Live');
        cy.get('[data-qa="email"]').should('be.visible').and('have.value', 'lucalive@email.com');
        cy.get('[data-qa="password"]').should('be.visible').type('password123')
        cy.get('[data-qa="days"]').select('1')
        cy.get('[data-qa="months"]').select('January')
        cy.get('[data-qa="years"]').select('2003')

        cy.get('#newsletter').click()

        cy.get('[data-qa="first_name"]').type('Luca')
        cy.get('[data-qa="last_name"]').type('Live')
        cy.get('[data-qa="company"]').type('Vertere')
        cy.get('[data-qa="address"]').type('123 leviste')
        cy.get('[data-qa="country"]').select('Australia')
        cy.get('[data-qa="state"]').type('idk')
        cy.get('[data-qa="city"]').type('Sydney')
        cy.get('[data-qa="zipcode"]').type('12345')
        cy.get('[data-qa="mobile_number"]').type('09123456789')*/
        // checkout
    })

    it.skip('Place Order: Login before checkout')
})
