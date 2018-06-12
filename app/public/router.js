(function() {
  angular
    .module('SampleUI')
    .config(Conf);

  function Conf($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/user/main.view.client.html',
        controller: 'MainController',
        controllerAs: 'model'
      })
      .when('/send_money', {
        templateUrl: 'views/user/payment.form.view.client.html',
        controller: 'PaymentFormController',
        controllerAs: 'model'
      })
      .when('/transaction_history', {
        templateUrl: 'views/user/transactions.view.client.html',
        controller: 'TransactionHistoryController',
        controllerAs: 'model'
      })
      .otherwise({
        redirectTo: '/'
      })
  }

})();