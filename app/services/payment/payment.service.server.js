/**
 * Load the transaction list from a local file. Ideally this should not be here
 * and the transactions should come from a database
 */
const data = require('../../../utilities/transaction_history.json');

/**
 * Handler for /api/pay
 * @param req The ExpressJS request object
 * @param res The ExpressJS response object
 */
function pay(req, res) {
  // Timeout to simulate processing time (3s)
  setTimeout(() => {
    // Get current date and format it to the required string MM/DD/YYYY
    let date = new Date();
    const dt = date.getDate();
    const day = date.getMonth();
    const year = date.getFullYear();
    date = `${day}/${dt}/${year}`;

    // Insert the new transaction in the locally stored transaction array
    data.unshift({
      amount: req.body.amount,
      name: req.body.email.split('@')[0],
      date,
    });
    res.sendStatus(200);
  }, 3000);
}

/**
 * Handler for the queries on the transaction list
 * @param req The ExpressJS request object
 * @param res The ExpressJS response object
 */
function getTransactionList(req, res) {

  // Timeout to simulate processing time
  setTimeout(() => {
    const startIndex = parseInt(req.query.startIndex);
    const result = [];

    // Handle edge case where start index exceeds the data length
    if (startIndex >= data.length) {
      res.status(200).json(result);
      return;
    }

    // Calculate end index, the app provides 30 transactions at a time for now
    let endIndex = startIndex + 30;

    // Edge case handling if endIndex > data length
    if (endIndex >= data.length) {
      endIndex = data.length;
    }

    // push the required data into a new array and send back
    for (let i = startIndex; i < endIndex; i += 1) {
      result.push(data[i]);
    }
    return res.status(200).json(result);
  }, 500);
}

module.exports = {
  pay,
  getTransactionList,
};
