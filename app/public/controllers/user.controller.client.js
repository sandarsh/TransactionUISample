(function(){
  angular
    .module("SampleUI")
    .controller("MainController", MainController)
    .controller("PaymentFormController", PaymentFormController);

  function MainController() {
    let vm = this;
  //  Additional functionality for the main page here
  }

  function PaymentFormController($location, $route, PaymentService) {
    let vm = this;
    let amountAbsValue;
    let isEmailPopperTriggered;
    let isAmountPopperTriggered;

    function init() {
      amountAbsValue = '';
      vm.amount = amountAbsValue;
      vm.email = "";
      vm.message = "";
      vm.transactionReason = "";
      isEmailPopperTriggered = false;
      isAmountPopperTriggered = false;
      vm.isEmailValid = false;
      vm.isAmountValid = false;
      vm.isPaymentReasonValid = false;
      vm.showLoader = false;
      vm.currencyType = 'USD';
      vm.isReasonSelected = false;
      vm.transactionReason = '';
      vm.isPaymentSuccessful = false;
      vm.isPaymentFailed = false;
    }

    vm.saveTransactionReason = function() {
      vm.isReasonSelected = true;
    };

    vm.validateEmail = function() {
      let email = vm.email;
      const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      vm.isEmailValid = re.test(email);

      if (vm.isEmailValid) {
        // Email is valid
        vm.emailValidationStyle = {
          "border-color": "#ccc"
        };
        isEmailPopperTriggered = false;
        $('#email').each(function(){
          $(this).popover('hide');
        })
      } else {
        // Email is invalid
        vm.emailValidationStyle = {
          "border-color": "#c12e2a",
          "border-width" : "2px"
        };

        if (!isEmailPopperTriggered) {
          isEmailPopperTriggered = true;
          $('#email').each(function () {
            $(this).popover({
              fallbackPlacement: 'clockwise',
              container: "body",
              placement: "right",
              trigger: "manual",
              content: "Invalid Email"
            });
            $(this).popover('show');
          })
        }
      }
    };

    vm.transformCurrency = function(toLocal) {
      if (!vm.isAmountValid) {
        return;
      }
      if (toLocal) {
        let finalNum;
        switch (vm.currencyType) {
          case 'USD':
            finalNum = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(amountAbsValue);
            break;
          case 'EUR':
            finalNum = new Intl.NumberFormat('en-EU', {style: 'currency', currency: 'EUR'}).format(amountAbsValue);
            break;
          case 'JPY':
            finalNum = new Intl.NumberFormat('ja-JP', {style: 'currency', currency: 'JPY'}).format(amountAbsValue);
            break;
        }
        vm.amount = finalNum;
      } else {
        vm.amount = amountAbsValue;
      }
    };

    vm.validateAmount = function() {
      let currAmount = vm.amount;
      let convertedAmt = +currAmount;
      if(isNaN(convertedAmt) || currAmount === '') {
        vm.isAmountValid = false;
        vm.amtValidationStyle = {
          "border-color": "#c12e2a",
          "border-width" : "2px"
        };
        if (!isAmountPopperTriggered) {
          isAmountPopperTriggered = true;
          $('#amount').each(function () {
            $(this).popover({
              fallbackPlacement: 'clockwise',
              container: "body",
              placement: "right",
              trigger: "manual",
              content: "Invalid amount entered. Please enter a valid amount. Only numbers and decimal allowed."
            });
            $(this).popover('show');
          })
        }
      } else {
        vm.isAmountValid = true;
        vm.amtValidationStyle = {
          "border-color": "#ccc"
        };
        isAmountPopperTriggered = false;
        $('#amount').each(function(){
          $(this).popover('hide');
        });
        amountAbsValue = convertedAmt.toFixed(2);
      }
    };

    vm.clear = function() {
      init();
    };

    vm.submit = function () {
      if(!vm.isEmailValid || !vm.isAmountValid || !vm.isReasonSelected) {
        vm.validateAmount();
        vm.validateEmail();
        return;
      }
      vm.showLoader = true;
      let paymentDetails = {
        email: vm.email,
        amount: vm.amount,
        message: vm.message,
        reason: vm.transactionReason,
        currency: vm.currencyType
      };
      vm.blur = {
        "filter": "blur(5px)",
        "opacity": "0.2"
      };
      PaymentService
        .pay(paymentDetails)
        .then(function() {
          vm.isPaymentSuccessful = true;
          vm.showLoader = false;
        }, function() {
          vm.isPaymentFailed = true;
          vm.showLoader = false;
        })
    };

    vm.reload = function() {
      $route.reload();
    };

    init();
  }
})();