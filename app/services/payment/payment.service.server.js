const data = require('../../../utilities/transaction_history.json');

function pay(req, res) {
  setTimeout(() => {
    let date = new Date();
    let dt = date.getDate();
    let day = date.getMonth();
    let year = date.getFullYear();
    date = day + "/" + dt + "/" + year;
    data.unshift({
      amount: req.body.amount,
      name: req.body.email.split('@')[0],
      date: date
    });
    res.sendStatus(200);
  }, 3000);
}

function getTransactionList(req, res) {
  setTimeout(() => {
    const startIndex = parseInt(req.query.startIndex);
    const result = [];
    let endIndex = startIndex + 30;
    if (endIndex >= data.length) {
      endIndex = data.length;
    }
    for (let i = startIndex; i < endIndex; i += 1) {
      result.push(data[i]);
    }
    res.status(200).json(result);
  }, 500);
}

module.exports = {
  pay,
  getTransactionList,
};
