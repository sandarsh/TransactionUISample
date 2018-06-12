/**
 * @fileOverview
 * TODO Overview of the file
 */

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./app/services/logger.service.js');

/**
 * Load the router module to route requests
 */
const routes = require('./app/services/router.service.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes);
app.use('/', express.static(`${__dirname}/app/public`));

const PORT = process.env.PORT || process.env.NODE_PORT;

app.listen(PORT, () => (logger.info('Listening on port:', PORT)));
