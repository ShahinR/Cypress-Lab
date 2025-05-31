/**
 * @author      LBO DevTeam <s.rastgar@laboutiqueofficielle.com>
 * @copyright   Copyright (c) Laboutiqueofficielle
 * @license     Proprietary
 */

// Building-up an E2E order return test scenario
import confirmNewMultiItemsBasketOrder from '../Standalones/FO/frictionlessHipayCheckoutWithPromoCode.js'
import orderShipmentProcessSimulation from '../runPrerequisites/Sql/orderShipmentProcessSimulation.js'
import customerReturnTheOrderAndRequestRefund from '../Scenarios/FO/customerReturnTheOrderFullRefund.js'
import acceprReturnedOrderRequest from '../runPrerequisites/Bob/acceptOrderReturnRequest.js'

// Wrap the import in an async function and add a 3-second wait between each step to increase run fluidity
const waitFor = async (fn) => {
    await fn()
    await cy.wait(3000)
}
(async () => {
    try {
        await waitFor(confirmNewMultiItemsBasketOrder)
        await waitFor(orderShipmentProcessSimulation)
        await waitFor(customerReturnTheOrderAndRequestRefund)
        await waitFor(acceprReturnedOrderRequest)
    } catch (error) {
        console.error('An error occurred during the execution of this run file. Please review the error log for details: ', error)
    }
})()
