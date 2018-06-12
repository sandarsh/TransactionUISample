(function() {
  angular
    .module("SampleUI")
    .controller("TransactionHistoryController", TransactionHistoryController);

  function TransactionHistoryController(PaymentService) {
    let vm = this;
    let startIndex = 0;
    vm.useDocBottom = false;

    function init() {
      startIndex = 0;
      vm.data = [];
    }

    vm.nextPage = function() {
      PaymentService
        .getTransactionList(startIndex)
        .then(function(data) {
          const newItems = data.data;
          for(let i in newItems) {
            vm.data.push(newItems[i]);
          }
          startIndex = vm.data.length;
        }, function(err) {
            vm.data.push("Could not load more data..");
        })
    };

    init();
  }
})();