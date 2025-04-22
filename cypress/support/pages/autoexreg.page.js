// practice pages with automation exercise
import { generateUserData } from "../fakersutils";
// create faker
const userData = generateUserData()
    
class AutoExRegistrationPage {
    //locators
    signupNameInput = '[data-qa="signup-name"]'
    signupEmailInput = '[data-qa="signup-email"]'
    signupButton = '[data-qa="signup-button"]'
    mrInput = '#uniform-id_gender1'
    mrsInput = '#uniform-id_gender2'
    nameInput = '[data-qa="name"]'
    emailInput = '[data-qa="email"]'
    passwordInput = '[data-qa="password"]' 
    dayInput = '[data-qa="days"]'
    monthInput =  '[data-qa="months"]'
    yearInput = '[data-qa="years"]' 
    firstNameInput = '[data-qa="first_name"]' 
    lastNameInput = '[data-qa="last_name"]'
    companyInput = '[data-qa="company"]'
    addressInput = '[data-qa="address"]'
    address2Input = '[data-qa="address2"]'
    countryInput = '[data-qa="country"]'
    stateInput = '[data-qa="state"]'
    cityInput = '[data-qa="city"]'
    zipcodeInput = '[data-qa="zipcode"]'
    mobileNumInput = '[data-qa="mobile_number"]'
    createAccButton = '[data-qa="create-account"]'
    cardNameInput = '[data-qa="name-on-card"]' 
    cardNumInput = '[data-qa="card-number"]' 
    cvcInput = '[data-qa="cvc"]'
    expiryMonthInput = '[data-qa="expiry-month"]'
    expiryYearInput = '[data-qa="expiry-year"]'
    payButton = '[data-qa="pay-button"]'

    /*
    import { generateUserData } from "./fakersutils";
    const userData = generateUserData()
    */ 
    /* title, name, email, gender, password, day, month, year, firstName, 
    lastName, company, address, address2, country, state, city,
    zipcode, mobileNum, cardNum, cvc, endMonth, endYear*/
    // use faker
    fillSignUpForm(){
        cy.get(this.signupNameInput).should('be.visible').type(userData.name)
        cy.get(this.signupEmailInput).should('be.visible').type(userData.email)
        cy.get(this.signupButton).should('be.visible').and('contain','Signup').click()
    }

    submitRegisterForm(){
        if(userData.gender == 1){
            // Mr
            cy.get(this.mrInput).should('be.visible').click()
        } else if (userData.gender == 2){
            // Mrs
            cy.get(this.mrsInput).should('be.visible').click()
        }
        cy.get(this.nameInput).should('be.visible').and('have.value', userData.name);
        cy.get(this.emailInput).should('be.visible').and('have.value', userData.email);
        cy.get(this.passwordInput).should('be.visible').type(userData.password)
        cy.get(this.dayInput).select(userData.day)
        cy.get(this.monthInput).select(userData.month)
        cy.get(this.yearInput).select(userData.year)

        cy.get('#newsletter').click()
        cy.get('#optin').click()

        cy.get(this.firstNameInput).type(userData.firstName).should('have.value', userData.firstName)
        cy.get(this.lastNameInput).type(userData.lastName).should('have.value', userData.lastName)
        cy.get(this.companyInput).type(userData.company).should('have.value', userData.company)
        cy.get(this.addressInput).type(userData.address).should('have.value', userData.address)
        cy.get(this.address2Input).type(userData.address2).should('have.value', userData.address2)
        cy.get(this.countryInput).select(userData.country).should('have.value', userData.country)
        cy.get(this.stateInput).type(userData.state).should('have.value', userData.state)
        cy.get(this.cityInput).type(userData.city).should('have.value', userData.city)
        cy.get(this.zipcodeInput).type(userData.zipcode).should('have.value', userData.zipcode)
        cy.get(this.mobileNumInput).type(userData.mobileNum).should('have.value', userData.mobileNum)
        // create the account
        cy.get(this.createAccButton).should('be.visible').click()
        // check correct url
        
        cy.dynamicfilename('Account-created')
        // goes to home page
        cy.get('[data-qa="continue-button"]').should('be.visible').click()
        cy.get('b').should('contain', userData.name)
        cy.dynamicfilename('Return-to-home-after-reg')
    }

    // perform login
    loginForm(){}

    // check details are correct before checkout
    verifyDetails(){}

    // checkout
    checkout(){}

}

export default new AutoExRegistrationPage()