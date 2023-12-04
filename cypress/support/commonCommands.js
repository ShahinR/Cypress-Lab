/**
 * @author      <shahin.rastgar@gmail.com>
 * @copyright   Copyright (c) ShahinR
 * @license     Proprietary
 */

// Random customer name in order to have no duplication  
const uuid = () => Cypress._.random(0, 1e6)
const RANDOM = uuid()
const CUSTOM_NAME = `TestUser${RANDOM}`

Cypress.Commands.add('front', (front) => {
  cy.visit(Cypress.env('fo'), { responseTimeout: 10000 }, { followRedirect: true })
  cy.viewport(1280, 850)
  Cypress.config('responseTimeout', 80000)
 })

Cypress.Commands.add('customInfo', (customInfo) => {

  // Add a random customer first name
  cy.get('#sign-username')
    .click()
    .type(CUSTOM_NAME)

  // Add a password for customer profile
  cy.get('#sign-password')
    .click()
    .type(Cypress.env('custom_password'))
  })
  
Cypress.Commands.add('customerLogin', (customerLogin) => {  
  // Add a random customer first name
  cy.get('#signin2').click({force : true})

  cy.get('#sign-username')
    .click()
    .type(CUSTOM_NAME)

  // Add a password for
  cy.get('#sign-password')
    .click()
    .type(Cypress.env('custom_password'))
  cy.get('#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force : true})

  // login
  cy.get('#login2').click({force : true})
  cy.get('#loginusername')
    .click({force: true})
    .type(CUSTOM_NAME)

  cy.get('#loginpassword')
    .click({force: true})
    .type(Cypress.env('custom_password'))
  
  // Login
  cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary')
    .should('exist')
    .should('be.visible')
    .should('be.enabled')
    .and('have.css', 'text-decoration')
  
  cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force : true})
  cy.wait(2000)
})

Cypress.Commands.add('chaiAssertion', (chaiAssertion)=> {
  // Chai library insertion
  var chai = require('chai');  
  var assert = chai.assert;    // Using Assert style
  var expect = chai.expect;    // Using Expect style
  var should = chai.should();  // Using Should style
})

Cypress.Commands.add("validateDomElementsAssertion", function ($elem) {
  cy.get($elem, { timeout: 30000 })
    .should("exist")
    .should("have.css", "font-family", "text-decoration")
    .and("have.length.at.least", 1)
})

Cypress.Commands.add('IgnoreUncaughtExceptions', (IgnoreUncaughtExceptions) => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })
})

