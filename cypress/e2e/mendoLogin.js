/**
 * @author      <shahin@codequality.fr>
 * @copyright   Copyright (c) codequality.fr
 * @license     Proprietary
 */

describe(`Login process for ${Cypress.config('baseUrl')}`, () => {
  const code = '1234' // Replace or dynamically load via fixture

  // Ensure the test starts with a clean state
  before(() => {
    cy.waitForFullyLoad()
    cy.chaiAssertion()
  })

  const setupIntercepts = () => {
    cy.intercept('POST', 'https://api.mendo.cloud/groups/isRegisteredEmail').as('isRegisteredEmail')
    cy.intercept('POST', 'https://api.mendo.cloud/groups/requestAccessCode').as('requestAccessCode')
  };

  const visitAppAndSelectLang = (lang = 'fr') => {
    cy.visit('/', {
      failOnStatusCode: false,
      responseTimeout: 10000,
      followRedirect: false,
    })

    cy.validateElement('.text-white-0')
    cy.get('.text-white-0').click({ force: true })

    if (lang === 'en') {
      cy.validateElement('button[role="btn-translate"]')
      cy.get('button[role="btn-translate"]').click({ force: true })
      cy.log('Language switched to English')
    }
  }

  const completeLoginFlow = (langLabel) => {
    cy.log(`Starting login flow in ${langLabel.toUpperCase()}`),
      [
        '.font-inter > :nth-child(1) > :nth-child(1) > .w-full',
        '.object-contain',
        '.font-extrabold',
        'p.text-sm',
      ].forEach(selector => cy.validateElement(selector))

    //CGU and Privacy Policy links
    cy.checkPolicyLinks('p.text-sm.text-mendo-gray-500')

    // Email input & assertions 
    cy.typeEmail(Cypress.env('userEmail'))
    cy.clickConnectButton()
    cy.validateElement('a.text-blue-600.cursor-pointer')
    cy.get('a.text-blue-600.cursor-pointer').click({ force: true })
    cy.typeEmail(Cypress.env('userEmail'))
    cy.clickConnectButton();

    // Auth steps (Microsoft and Email)
    ['div[role="btn-microsoftAuth"]', 'div[role="btn-emailAuth"]'].forEach(selector => {
      cy.validateElement(selector);
      cy.get(selector).click({ force: true });
    });

    // API waits captured earlier
    cy.wait('@isRegisteredEmail').its('response.statusCode').should('eq', 201);
    cy.wait('@requestAccessCode').its('response.statusCode').should('eq', 201);

    // User email validation as well as code input
    cy.validateElement('.text-2xl');
    cy.get('.flex-col.gap-2 > .text-sm').invoke('text').should('include', Cypress.env('userEmail'));
    cy.validateElement('div.flex.gap-2 input');
    cy.get('div.flex.gap-2 input')
      .should('have.length', 4)
      .each(($input, index) => {
        cy.wrap($input).type(code[index]);
        cy.wrap($input).should('have.value', code[index]);
      });

    cy.log(`Completed login flow in ${langLabel.toUpperCase()}`)
  }

  it('should complete the login flow in FR, then reload and do the same in EN', () => {
    // Run flow in French
    visitAppAndSelectLang('fr')
    setupIntercepts()
    completeLoginFlow('fr')

    // Reload and run flow in English
    cy.wait(1000)
    visitAppAndSelectLang('en')
    setupIntercepts()
    completeLoginFlow('en')
  })
})










