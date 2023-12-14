/**
 * @author      <shahin.rastgar@gmail.com>
 * @copyright   Copyright (c) ShahinR
 * @license     Proprietary
 */

Cypress._.each(Cypress.env('viewports'), viewport => {
  Cypress._.each(Cypress.env('urlToTest'), url => {
    describe(`User signs up in the platform for: ${url}`, () => {
      before(() => {
        cy.IgnoreUncaughtExceptions()
        cy.chaiAssertion()
        cy.callFrontOffice()
      })

      it(`Add a new client subscription on ${viewport}`, function () {
        // Some basic assertion testing for id="signin2" element  with chai library 
        cy.get('#signin2')
          .should('exist')
          .should('be.visible')
          .and('have.css', 'text-decoration')

        // open the inscription form ( click({force : true}) ==> will handle the DOM hidden elements (if any))
        cy.get('#signin2').click({ force: true })

        // Assertion testing for signup form
        cy.get('#signInModal > .modal-dialog > .modal-content > .modal-body > form')
          .should('exist')
          .should('be.visible')
          .and('have.css', 'text-decoration')

        // Username title verifications
        cy.get('#signInModal > .modal-dialog > .modal-content > .modal-body > form > :nth-child(1) > .form-control-label')
          .should('exist')
          .should('be.visible')
          .and('include.text', 'Username')

        // Username Textbox assretion testing
        cy.get('#sign-username')
          .should('exist')
          .should('be.visible')
          .should('be.enabled')
          .and('have.css', 'text-decoration')

        // Password title verifications
        cy.get('#signInModal > .modal-dialog > .modal-content > .modal-body > form > :nth-child(2) > .form-control-label')
          .should('exist')
          .should('be.visible')
          .and('include.text', 'Password')

        // Username Textbox assretion testing
        cy.get('#sign-password')
          .should('exist')
          .should('be.visible')
          .should('be.enabled')
          .and('have.css', 'text-decoration')

        // Customer inscription with an stored commande --REF: commonCommands.js 
        cy.customInfo()

        // Confirm subscription --asertion testing
        cy.get('#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary')
          .should('exist')
          .should('be.visible')
          .should('be.enabled')
          .should('have.css', 'text-decoration')

        // HTTP 200 validation -- In order to make sure user has been created successfully
        cy.intercept({
          method: 'POST',
          url: 'https://api.demoblaze.com/signup',
        }).as('apiCheck for res = HTTP 200')

        cy.get('#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary')
          .eq(0)
          .click({ force: true })

        cy.wait('@apiCheck for res = HTTP 200').then((interception) => {
          assert.isNotNull(interception.response.body, 'New user has been addedsuccessfully')
        })
        cy.percySnapshot('Login Form snapshot for: ' + url)
      })
    })
  })
})