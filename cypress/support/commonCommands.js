/**
 * @author      LBO DevTeam <s.rastgar@laboutiqueofficielle.com>
 * @copyright   Copyright (c) Laboutiqueofficielle
 * @license     Proprietary
 */

// Import user's Page Object Model (PoM) classes

Cypress.Commands.add("customInfo", () => {
  // Generate random email
  const generateRandomEmail = () => `clientcypresslbo${Cypress._.random(0, 1e6)}@gmail.com`

  // Update login.json with new user credentials
  cy.readFile("cypress/fixtures/login.json").then(data => {
    data.custom_email = generateRandomEmail()
    data.custom_password = "0@x?Ci4?0"
    return cy.writeFile("cypress/fixtures/login.json", data)
  })

  // Set custom personal information
  cy.get("[data-cy=date] .c-date__day select").select("23")
  cy.get("[data-cy=date] .c-date__month select").select("10")
  cy.get("[data-cy=date] .c-date__year select").select("1984")

  // Set last name
  cy.delayedType("[data-cy=customer-firstname]", "CypressFirstName")

  // Set first name
  cy.delayedType("[data-cy=customer-name]", "CypressLastName")

  // Use credentials from login.json to register new client
  cy.readFile("cypress/fixtures/login.json").then(user => {
    cy.delayedType("[data-cy=customer-email]", user.custom_email)
    cy.delayedType("[data-cy=customer-password]", user.custom_password)
  })
})

Cypress.Commands.add("acceptCookies", (acceptCookies) => {
  cy.wait(3000) // Wait for 5 seconds for the cookies pop-up to appear
  cy.get("body").then(($ele) => {
    switch (true) {
      case $ele.find("#popupFullConsent", { timeout: 10000 }).length > 0:
        cy.get("#popupFullConsent").click({ force: true })
        break
      case $ele.find(".cookiebanner__flex", { timeout: 10000 }).length > 0:
        cy.get(".cookiebanner__flex").click({ force: true })
        break
      default:
        cy.log("Cookies are confirmed")
        break
    }
  })
})

Cypress.Commands.add("customLogin", () => {
  const loginPage = new UserLoginPage()
  cy.validateElement("[data-cy=header-tool--account]")
  cy.get("[data-cy=header-tool--account]").first().click()

  // Retrieve credentials and log in from fixture
  cy.readFile("cypress/fixtures/login.json").then((credentials) => {
    loginPage.fillUserName(credentials.custom_email)
    loginPage.fillPassword(credentials.custom_password)
    loginPage.submit()

    // Iterative approach to handle submit button disappearance
    let retryCount = 0
    const maxRetries = 3

    function waitForSubmitButton() {
      cy.get("body").then(($body) => {
        const submitElementExists = $body.find("[data-cy=submit]").length > 0
        if (submitElementExists && retryCount < maxRetries) {
          retryCount++
          cy.validateElement("[data-cy=submit]")
          cy.get("[data-cy=submit]").click({ force: true })
          cy.wait(1000)
          waitForSubmitButton()
        } else if (!submitElementExists) {
          cy.log("Success: the client is already logged-in")
        } else {
          cy.log("Warning: Maximum retries reached for login process")
        }
      })
    }
    waitForSubmitButton()

    // Ensure no error message exists
    cy.get(".c-form-message--error").should("not.exist")

    // Mock API interception
    cy.intercept({
      method: "GET",
      url: "**/v4/secure/account/addresses",
    }).as("securedAddressesApiResponse")
  })
})

Cypress.Commands.add("validateElement", function ($elem) {
  cy.get($elem, { timeout: 30000 })
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




