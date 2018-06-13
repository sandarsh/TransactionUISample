(function() {
  angular
    .module("SampleUI")
    .factory("PaymentService", PaymentService);

  /**
   * Payment service for calls to backend. Controllers are expected to use these services
   * @param $http
   * @returns {{pay: pay, getTransactionList: getTransactionList, getTransactionList: getTransactionList}}
   * @constructor
   */
  function PaymentService($http) {
    let api = {
      pay: pay,
      getTransactionList,getTransactionList
    };
    return api;

    /**
     * POST request to /api/pay endpoint
     * @param paymentDetails
     * @returns {*}
     */
    function pay(paymentDetails) {
      let url = '/api/pay';
      return $http.post(url, paymentDetails);
    }

    /**
     * GET to get transaction list with startIndex as the query_param
     * @param startIndex
     * @returns {V|*}
     */
    function getTransactionList(startIndex) {
      let url = '/api/transactions?startIndex=' + startIndex;
      return $http.get(url);
    }
  }

})();