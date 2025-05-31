/**
 * @author      LBO DevTeam <s.rastgar@laboutiqueofficielle.com>
 * @copyright   Copyright (c) Laboutiqueofficielle
 * @license     Proprietary
 */

import cypress from "eslint-plugin-cypress"
import unusedImports from "eslint-plugin-unused-imports"
import chaiFriendly from "eslint-plugin-chai-friendly"
import globals from "globals"

export default [
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es6,
        ...globals.node,
        ...globals.cypress,
      },
    },
    plugins: {
      cypress,
      "unused-imports": unusedImports,
      "chai-friendly": chaiFriendly,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "no-unused-expressions": 0,
      "chai-friendly/no-unused-expressions": 2,
      "cypress/no-assigning-return-values": "error",
      "cypress/no-unnecessary-waiting": "warn",
      "cypress/unused-imports": "warn",
      "cypress/assertion-before-screenshot": "warn",
      "cypress/no-force": "off",
      "cypress/no-async-tests": "error",
      "cypress/no-async-before": "error",
      "cypress/no-pause": "error",
    },
    
  },
]
