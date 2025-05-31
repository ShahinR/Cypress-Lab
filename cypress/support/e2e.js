/**
 * @author      LBO DevTeam <s.rastgar@laboutiqueofficielle.com>
 * @copyright   Copyright (c) Laboutiqueofficielle
 * @license     Proprietary
 */

// Import mandatory config files
import "./commonCommands"
import 'cypress-each'

require("cypress-failed-log")
require('cypress-iframe')

// Turn off uncaught exception handling unhandled promise rejections
Cypress.on("uncaught:exception", (err, runnable, promise) => {
  if (promise) {
    return false
  }
})

// Console error detection ==> USER ABORT
import failOnConsoleError, { consoleType } from "cypress-fail-on-console-error"
const config = {
  // Turn off Mailtrap login page bug
  excludeMessages: ["[OptinMonster]", "^'The origin header was not set in the request.'"],
  includeConsoleTypes: [consoleType.ERROR],
}
failOnConsoleError(config)


