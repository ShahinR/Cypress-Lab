/**
 * @author      LBO DevTeam <s.rastgar@laboutiqueofficielle.com>
 * @copyright   Copyright (c) Laboutiqueofficielle
 * @license     Proprietary
 */

// Pre-requisites : 
import addNewCustomerAccount from '../../runPrerequisites/FO/addNewAccount.js'

/*
Check payment method should be activated in back-office otherwise test will fail
*/

Cypress._.each(Cypress.env('viewports'), viewport => {
  describe(`Validating BANK CHECK checkout process`, () => {
    before(() => {
      cy.viewport(viewport)
      cy.chaiAssertion()
    })

    it(`Proceeding with checkout on ${viewport}`, { pageLoadTimeout: 50000 }, () => {
      cy.fixture('stores').then((stores) => {
        stores.forEach((store) => {
          cy.visit(store, { failOnStatusCode: false, responseTimeout: 10000, followRedirect: true })
          cy.acceptCookies()
          cy.customLogin()
          cy.listingApiCalls()
          cy.commonApiInterception()
          cy.addShippingAddress()
          Cypress._.times(Cypress.env('numberOfRuns'), () => cy.basketCreationProcess({ store }))
          cy.basketValidation()
          cy.selectShippingMethod(store)
          cy.passiveCheckoutCheck(store)
        })
      })
    })
  })
})