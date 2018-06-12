/**
 * @fileOverview
 * Main router file
 * Loads all the services and then calls the handlers defined
 * in those services for specific routes.
 * ...
 * Author: Sandarsh Srivastava
 */

/**
 * Load the router module provided by express.js
 */
const router = require('express').Router();

/**
 * Load Services
 */
const paymentService = require('./payment/payment.service.server.js');
/*
Include more services here..
.
.
 */

/**
 * Basic REST service routes and their handlers.
 */
router.post('/pay', paymentService.pay);
router.get('/transactions', paymentService.getTransactionList);
/*
Add routes to other services here
.
.
 */


/**
 * Export router module to use in server.js
 */
module.exports = router;
