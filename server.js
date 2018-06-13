/**
 * @fileOverview
 * Main server file.
 * Loads environment variables
 * Uses routes defined in app/services/router
 * Initiates server daemon
 */

require('dotenv').config();

/**
 * Load expressjs
 * @type {*|createApplication}
 */
const express = require('express');

/**
 * Load body parser to parse JSON body
 * @type {Parsers|*}
 */
const bodyParser = require('body-parser');

/**
 * Load the logger module for logging
 * @type {*|winston.Logger}
 */
const logger = require('./app/services/logger.service.js');

/**
 * Load the router module to route requests
 */
const routes = require('./app/services/router.service.js');

/**
 * Initialize the applicaiton
 */
const app = express();

/**
 * Parse JSON in body
 */
app.use(bodyParser.json());

/**
 * Parse URL encoded arguments
 */
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Use the router service for /api routes
 */
app.use('/api', routes);

/**
 * Serve static and public resources from /app/public
 */
app.use('/', express.static(`${__dirname}/app/public`));

/**
 * Port number to run app on
 */
const PORT = process.env.PORT || process.env.NODE_PORT;

/**
 * Run server
 */
app.listen(PORT, () => (logger.info('Listening on port:', PORT)));
