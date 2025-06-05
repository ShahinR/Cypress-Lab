/**
 * @author      <shahin@codequality.fr>
 * @copyright   Copyright (c) codequality.fr
 * @license     Proprietary
 */

Cypress.Commands.add("validateElement", function ($elem) {
  cy.get($elem, { timeout: 20000 })
    .should("exist")
    .should("have.css", "font-family")
    .and("have.length.at.least", 1)
})

Cypress.Commands.add("waitForFullyLoad", () => {
  cy.get("body", { timeout: 20000 })
    .should("be.visible")
    .should("have.length", 1)
    .should("not.be.empty")
  cy.window().its("document.readyState").should("eq", "complete")
})

Cypress.Commands.add("chaiAssertion", (chaiAssertion) => {
  // Chai library insertion
  var chai = require("chai")
  var assert = chai.assert // Using Assert style
  var expect = chai.expect // Using Expect style
  var should = chai.should() // Using Should style
})

Cypress.Commands.add('typeEmail', (email) => {
  cy.validateElement('input[role="input-emailAuth"]')
  cy.get('input[role="input-emailAuth"]')
    .type(email)
    .should('have.value', email)
})

Cypress.Commands.add('clickConnectButton', () => {
  cy.validateElement('div[role="GenericButton"]');
  cy.get('div[role="GenericButton"]').click({ force: true })
})

Cypress.Commands.add('checkPolicyLinks', (selector) => {
  cy.validateElement(selector);
  cy.get(selector)
    .find('a')
    .each(($a) => {
      const href = $a.prop('href')
      expect(href, 'Link should have an href').to.exist
      cy.request(href).its('status').should('eq', 200)
    })
})



