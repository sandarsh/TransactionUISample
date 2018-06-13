(function(){
  angular
    .module("SampleUI")
    .controller("MainController", MainController)
    .controller("PaymentFormController", PaymentFormController);

  // Controls the main page. Here just as a place holder, can write more functionality here afterwards
  function MainController() {
    let vm = this;
  //  Additional functionality for the main page here
  }

  // Controller for the payment form.
  function PaymentFormController($route, PaymentService) {
    let vm = this;

    // The absolute value of the amount entered and not the formatted string with the currency symbol
    let amountAbsValue;

    // Var  to check if "email invalid" bubble is triggered
    let isEmailPopperTriggered;

    // Var to check if "amount invalid" bubble is triggered
    let isAmountPopperTriggered;

    // Initialize the view state
    function init() {
      amountAbsValue = '';
      // vm.amount is the formatted amount string with the currency sign etc.
      vm.amount = amountAbsValue;

      // Email entered by the user
      vm.email = "";

      // The message entered by the user
      vm.message = "";

      // The reason for transaction selected by the user
      vm.transactionReason = "";

      isEmailPopperTriggered = false;
      isAmountPopperTriggered = false;

      // Validation checks, also used to activate the "Next" button
      vm.isEmailValid = false;
      vm.isAmountValid = false;
      vm.isReasonSelected = false;

      // Is the loader on the screen or not
      vm.showLoader = false;

      vm.currencyType = 'USD';
      vm.transactionReason = '';

      // Success or failure for payment
      vm.isPaymentSuccessful = false;
      vm.isPaymentFailed = false;
    }

    /**
     * Change transaction reason selection to true
     */
    vm.saveTransactionReason = function() {
      vm.isReasonSelected = true;
    };

    /**
     * Email validation
     */
    vm.validateEmail = function() {
      let email = vm.email;

      // Regex to validate email
      const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      vm.isEmailValid = re.test(email);

      if (vm.isEmailValid) {
        // Email is valid

        // Change style on valid email removing the red borders
        vm.emailValidationStyle = {
          "border-color": "#ccc"
        };
        // Change popu trigger to false
        isEmailPopperTriggered = false;
        $('#email').each(function(){
          $(this).popover('hide');
        })
      } else {
        // Email is invalid

        // Change style to red borders
        vm.emailValidationStyle = {
          "border-color": "#c12e2a",
          "border-width" : "2px"
        };

        // Enable popup to say invalid email
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

    /**
     * Transform currency to a formatted string with currency and separators
     */
    vm.transformCurrency = function(toLocal) {
      // Simply return if amount is invalid
      if (!vm.isAmountValid) {
        return;
      }

      // toLocal controls formatted string to currency and vice versa
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

    /**
     * Perform validation on amount
     */
    vm.validateAmount = function() {
      let currAmount = vm.amount;

      // Convers amount from string to float NaN if invalid
      let convertedAmt = +currAmount;

      // If amount is invalid
      if(isNaN(convertedAmt) || currAmount === '') {
        vm.isAmountValid = false;

        // Change style to red borders
        vm.amtValidationStyle = {
          "border-color": "#c12e2a",
          "border-width" : "2px"
        };

        // Trigger invalid amount popper
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
        // Amount is valid
        vm.isAmountValid = true;

        // Change style to white borders
        vm.amtValidationStyle = {
          "border-color": "#ccc"
        };
        isAmountPopperTriggered = false;
        $('#amount').each(function(){
          $(this).popover('hide');
        });

        // Keep only two decimal places
        amountAbsValue = convertedAmt.toFixed(2);
      }
    };

    /**
     * Reset view state.
     */
    vm.clear = function() {
      init();
    };

    /**
     * Submit the transaction
     */
    vm.submit = function () {

      // Perform final validations
      if(!vm.isEmailValid || !vm.isAmountValid || !vm.isReasonSelected) {
        vm.validateAmount();
        vm.validateEmail();
        return;
      }

      // Initiate showing the loader
      vm.showLoader = true;

      // Create JSON to post to server
      let paymentDetails = {
        email: vm.email,
        amount: vm.amount,
        message: vm.message,
        reason: vm.transactionReason,
        currency: vm.currencyType
      };

      // Blur and disable the current background
      vm.blur = {
        "filter": "blur(5px)",
        "opacity": "0.2"
      };

      // Call to payment service
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

    /**
     * Reload the page
     */
    vm.reload = function() {
      $route.reload();
    };

    // Call to init to initialize view state
    init();
  }
})();