(function() {
  angular
    .module("SampleUI")
    .factory("PaymentService", PaymentService);

  function PaymentService($http) {
    let api = {
      pay: pay,
      getTransactionList,getTransactionList
    };
    return api;

    function pay(paymentDetails) {
      let url = '/api/pay';
      return $http.post(url, paymentDetails);
    }

    function getTransactionList(startIndex) {
      let url = '/api/transactions?startIndex=' + startIndex;
      return $http.get(url);
    }
  }

})();