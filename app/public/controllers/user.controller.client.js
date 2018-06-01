(function(){
  angular
    .module("SampleUI")
    .controller("MainController", MainController)
    .controller("PaymentFormController", PaymentFormController);

  function MainController() {
    let vm = this;
    vm.showLoginPopup = function() {
      console.log("Here");
    }
  }

  function PaymentFormController() {
    let vm = this;
    let amountToFill = 0;

    let isEmailPopperTriggered = false;
    let isAmountPopperTriggered = false;

    vm.isEmailValid = false;
    vm.isAmountValid = false;
    vm.isPaymentReasonValid = false;
    vm.currencyType = 'USD';
    vm.isReasonSelected = false;
    vm.transactionReason;

    vm.saveTransactionReason = function() {
      vm.isReasonSelected = true;
      console.log(vm.transactionReason);
      console.log('Email', vm.isEmailValid);
      console.log('Amount', vm.isAmountValid);
      console.log('Selected', vm.isReasonSelected);
    };

    vm.validateEmail = function() {
      vm.emailValidationStyle = {
        "border-color": "#c12e2a",
        "border-width" : "2px"
      };
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
      if (toLocal) {
        let finalNum;
        switch (vm.currencyType) {
          case 'USD':
            finalNum = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(amountToFill);
            // console.log(finalNum);
            break;
          case 'EUR':
            finalNum = new Intl.NumberFormat('en-EU', {style: 'currency', currency: 'EUR'}).format(amountToFill);
            // console.log(finalNum);
            break;
          case 'JPY':
            finalNum = new Intl.NumberFormat('ja-JP', {style: 'currency', currency: 'JPY'}).format(amountToFill);
            // console.log(finalNum);
            break;
        }
        vm.amount = finalNum;
      } else {
        vm.amount = amountToFill;
      }
      vm.isAmountValid = true;
    };

    vm.validateAmount = function() {
      vm.amtValidationStyle = {
        "border-color": "#c12e2a",
        "border-width" : "2px"
      };

      let amt = vm.amount;
      amt = +amt;
      if (isNaN(amt)) {
        console.log('Invalid');
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
              content: "Invalid amount entered. Please enter a valid amount."
            });
            $(this).popover('show');
          })
        }
        return false;

      } else {
        vm.amtValidationStyle = {
          "border-color": "#ccc"
        };
        isAmountPopperTriggered = false;
        $('#amount').each(function(){
          $(this).popover('hide');
        });
        amountToFill = amt.toFixed(2);
        // console.log(amountToFill);
        return true;
      }
    }


  }
})();