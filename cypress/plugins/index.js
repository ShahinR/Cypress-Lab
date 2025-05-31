/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

// Mariadb configs
const mysql = require("mysql")
const axios = require('axios')
module.exports = (on, config) => {
  // Existing task for database querying
  on("task", {
    queryDb: (query) => {
      return queryTestDb(query, config)
    },

    // Existing task for logging failed tests
    failed: require("cypress-failed-log/src/failed")(),
    log: (message) => {
      console.log(message)
      return null
    },

    // New batch request task to handle async HTTP requests with axios
    batchRequest: ({ baseUrl, paths }) => {
      const promises = paths.map((href) => {
        return axios.get(`${baseUrl}${href}`)
          .then((response) => ({
            href,
            status: response.status
          }))
          .catch(() => ({
            href,
            status: null
          }))
      })
      return Promise.all(promises)
    }
  })
}

function queryTestDb(query, config) {
  // creates a new mysql connection using credentials from cypress.json env's
  const connection = mysql.createConnection(config.env.db)
  // start connection to db
  connection.connect()
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error)
      else {
        connection.end()
        // console.log(results)
        return resolve(results)
      }
    })
  })
}