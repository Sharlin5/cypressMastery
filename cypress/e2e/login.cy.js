describe('login func', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/'); // Runs before every test
  });
  it('User is able to login with valid username and password', () => {
    cy.get('[data-test="username"]').type("standard_user")
    cy.get('[data-test="password"]').type("secret_sauce")
    cy.get('[data-test="login-button"]').click()
    cy.contains('Swag Labs').should('be.visible')
    cy.url().should("include", "/inventory")
  })
  it('User is unable to login with invalid username and password', () => {
    cy.get('[data-test="username"]').type("abc")
    cy.get('[data-test="password"]').type("abc")
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="username"]').should('be.visible')
    cy.get('[data-test="password"]').should('be.visible')
    cy.get('[data-test="error"]').should('be.visible')
  })
})