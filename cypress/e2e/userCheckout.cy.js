/**
 * @author      <shahin@codequality.fr>
 * @copyright   Copyright (c) 2023
 */

describe('Call LBO front-office and login', () => {

  beforeEach(function () {
    cy.front()
    cy.customerLogin()
    cy.IgnoreUncaughtExceptions()
    cy.chaiAssertion()
  })

  it('Add products to the basket', function () {
    // Some basic assertion testing 
    cy.get('#contcont > :nth-child(1) > .col-lg-3')
      .should('exist')
      .should('be.visible')
      .and('have.css', 'text-decoration')

    //Phones category --assertion validation
    cy.get('[onclick="byCat(\'phone\')"]')
      .should('exist')
      .should('be.visible')
      .and('have.css', 'text-decoration')

    cy.get('[onclick="byCat(\'phone\')"]').click({ force: true })

    // select the first product -- this is the first technique 
    cy.visit('https://www.demoblaze.com/prod.html?idp_=1', { failOnStatusCode: false })

    // Add to basket --first product
    cy.get('.col-sm-12 > .btn')
      .should('exist')
      .should('be.visible')
      .and('have.css', 'text-decoration')

    cy.get('.col-sm-12 > .btn').click({ force: true })
    cy.wait(2000)

    // Redirection to home page
    cy.get('.active > .nav-link').click({ force: true })

    // Get the second product from another category
    cy.get('[onclick="byCat(\'notebook\')"]').click({ force: true })

    // select the second product -- this is the second technique (non hard-coded IDP=xxxx) 
    // Select the first available product
    cy.get('[class="card-title"]')
      .then($elements => {
        cy.wrap($elements[0])
        .click()
      })
    // Add to basket --second product
    cy.get('.col-sm-12 > .btn')
      .should('exist')
      .should('be.visible')
      .and('have.css', 'text-decoration')

    cy.get('.col-sm-12 > .btn').click({ force: true })
    cy.wait(2000)
  })

  it('Checkout the cart', function () {
    // Visualize the basket
    cy.get(':nth-child(4) > .nav-link')
      .should('exist')
      .should('be.visible')
      .and('have.css', 'text-decoration')
    cy.get(':nth-child(4) > .nav-link').click({ force: true })
    cy.wait(2000)

    // Place Order 
    cy.get('.col-lg-1 > .btn')
      .should('exist')
      .should('be.visible')
      .and('have.css', 'text-decoration')
    cy.get('.col-lg-1 > .btn').click({ force: true })

    // Place order from
    cy.get('#orderModal > .modal-dialog > .modal-content > .modal-body > form')
      .should('exist', 'be.visible', 'have.css', 'text-decoration', 'color', 'line-through')

    // Text boxes
    // Name
    cy.get('#name').should('exist', 'be.visible', 'have.css', 'text-decoration', 'color', 'line-through')
    cy.get('#name')
      .click()
      .clear()
      .type(Cypress.env('custom_firstname'))

    // Country
    cy.get('#country').should('exist', 'be.visible', 'have.css', 'text-decoration', 'color', 'line-through')
    cy.get('#country')
      .click()
      .clear()
      .type(Cypress.env('custom_country'))

    // City
    cy.get('#city').should('exist', 'be.visible', 'have.css', 'text-decoration', 'color', 'line-through')
    cy.get('#city')
      .click()
      .clear()
      .type(Cypress.env('custom_city'))

    // Credit card
    cy.get('#card').should('exist', 'be.visible', 'have.css', 'text-decoration', 'color', 'line-through')
    cy.get('#card')
      .click()
      .clear()
      .type(Cypress.env('customer_cc_number'))

    // Month
    cy.get('#month').should('exist', 'be.visible', 'have.css', 'text-decoration', 'color', 'line-through')
    cy.get('#month')
      .click()
      .clear()
      .type('12')

    // Year
    cy.get('#year').should('exist', 'be.visible', 'have.css', 'text-decoration', 'color', 'line-through')

    // Date management --add 1 year to the current year
    var currentyear = new Date().getFullYear()
    var nextyear = (currentyear + 1);
    console.log(nextyear)
    cy.get('#year')
      .click()
      .clear()
      .type(nextyear)

    // Purchase
    cy.get('#orderModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary')
      .should('exist', 'be.visible', 'be.enabled', 'have.css', 'text-decoration', 'color')
    cy.get('#orderModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary')
      .click({ force: true })

    // Successful validation payment
    cy.get('.sweet-alert')
      .should('exist', 'be.visible', 'have.css', 'text-decoration', 'color', 'line-through')
      .and('contain.text', 'Thank you for your purchase!')

    // OK (confirm)
    cy.get('.confirm')
      .should('exist', 'be.visible', 'be.enabled', 'have.css', 'text-decoration', 'color')

    cy.get('.confirm').click({ force: true })
    cy.get('#orderModal > .modal-dialog > .modal-content > .modal-footer > .btn-secondary').click({ force: true })
    cy.visit(Cypress.env('fo'), { failOnStatusCode: false })

    // Log out
    cy.get('#logout2').should('exist', 'be.visible', 'be.enabled', 'have.css', 'text-decoration', 'color')
    cy.get('#logout2').click({ force: true })
  })
})