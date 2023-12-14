# Introduction
This repository is used to store all the automated tests and configurations forhttp://www.demoblaze.com which is an open api. 


1. **User signs up in the platform**
2. **User perform an order of 2 items**

# Prerequisites
- NPM 6.14.8+ (if you want to run tests with the GUI of Cypress)

# Installation
Clone the repository in your workspace

Run the Cypress installation
```bash
npm install cypress --save-dev
```
# Execute tests
## Launch Cypress with the graphical interface
This option allows you to select wich tests you want to run (one or all).
Firs you need to have _Cypress_ installed locally (be sure to install the same version than this project).
```bash
npx cypress open
```
Then, you just have to click on the test you want to run.

## Launch Cypress in headless mode
This is an example using the `run --spec` command.

```bash
npx cypress run --spec './cypress/integration/FO/<<YOUR_SCRIPT>>.js'
```
## Percy/cypress

[Percy](https://percy.io) visual testing for [Cypress](https://cypress.io).

### Usage

This is an example using the `cy.percySnapshot` command.

```javascript
describe('My app', () => {
  it('should look good', () => {
    cy.get('body').should('have.class', 'finished-loading');
    cy.percySnapshot();

    cy.get('button').click();
    cy.percySnapshot('Clicked button');
  });
});
```

```bash
make percy
```
### Configuration

To take a snapshot with Percy, just run the following command:

```bash
cy.percySnapshot()
```

You can configure different options to the snapshot with the following command:

```bash
cy.percySnapshot([name][, options])
```

Here's the parameters list:
- `name` - The snapshot name; must be unique to each snapshot; defaults to the full test title
- `options` - Additional snapshot options (overrides any project options)
  - `options.widths` - An array of widths to take screenshots at
  - `options.minHeight` - The minimum viewport height to take screenshots at
  - `options.percyCSS` - Percy specific CSS only applied in Percy's rendering environment
  - `options.requestHeaders` - Headers that should be used during asset discovery
  - `options.enableJavaScript` - Enable JavaScript in Percy's rendering environment

### Headless test execution

```bash
make percy <<< cypress/../<<YOUR_SCRIPT>>.js
```

### Percy dashboard

You can find all the Percy's snapshots on the following Dashboard : https://percy.io/cbb17ef2/LBO-Cypress-Percy.

