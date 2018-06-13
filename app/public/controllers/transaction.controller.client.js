(function() {
  angular
    .module("SampleUI")
    .controller("TransactionHistoryController", TransactionHistoryController);

  /**
   * Controller for the transaction history view
   * @param PaymentService
   * @constructor
   */
  function TransactionHistoryController(PaymentService) {
    let vm = this;

    // Initialize start index to zero. This is a marker sent to backend to identify after which index more
    // results are needed
    let startIndex = 0;

    // Initialize state of the view
    function init() {
      startIndex = 0;
      vm.data = [];
    }

    // Handler function for the infinite-scroll directive
    vm.nextPage = function() {
      //Start index passed to the backend
      PaymentService
        .getTransactionList(startIndex)
        .then(function(data) {
          const newItems = data.data;

          // New items pushed to view
          for(let i in newItems) {
            vm.data.push(newItems[i]);
          }

          // Start index update
          startIndex = vm.data.length;
        }, function(err) {
            vm.data.push("Could not load more data..");
        })
    };

    // Initialize view state
    init();
  }
})();