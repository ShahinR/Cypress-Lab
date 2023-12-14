/**
 * @author      <shahin.rastgar@gmail.com>
 * @copyright   Copyright (c) ShahinR
 * @license     Proprietary
 */

import './commonCommands'
import 'cypress-react-selector'
import '@testing-library/cypress/add-commands'
import 'cypress-iframe'
import '@percy/cypress'
import sqlServer from 'cypress-sql-server'
import '@percy/cypress'
require("cypress-failed-log")
sqlServer.loadDBCommands()


