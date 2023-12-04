/**
 * @author      <shahin.rastgar@gmail.com>
 * @copyright   Copyright (c) ShahinR
 * @license     Proprietary
 */

// Import commands.js using ES2015 syntax:
import './commonCommands'
import 'cypress-react-selector'
import '@testing-library/cypress/add-commands'
import 'cypress-iframe'
import '@percy/cypress'
import sqlServer from 'cypress-sql-server'
sqlServer.loadDBCommands()

