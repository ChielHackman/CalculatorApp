(function() {
  function Calculator(displayId) {
    this.displayId = displayId;
    this.executeArray = [];
  }

// Method to update the display with the content of the executeArray.
  Calculator.prototype.updateDisplay = function() {
    document.getElementById(this.displayId).innerText = this.executeArray.join('');
  };

  Calculator.prototype.addToLast = function(input) {
    this.executeArray[this.executeArray.length - 1] += input;
  };

  Calculator.prototype.getLastItem = function() {
    return this.executeArray[this.executeArray.length - 1];
  };

/*
  Method to handle the number input
  If the last item in the executeArray is a number, we concatenate it to the last item.
  For example if the last item is the number 8 and the next input is a 7 then the value in the executeArray
  will be 87.
  If the last item in the executeArray is not a number than it's a operator so we can push the number to the executeArray.
*/
  Calculator.prototype.handleNumber = function(number) {
    if (isNaN(this.getLastItem())) {
      this.executeArray.push(number.toString());
    }
    else {
      this.addToLast(number.toString());
    }
    this.updateDisplay();
  };

/*
  Method to handle the operator input.
  First we check if the last item is a number, because 2 operators for example (++) don't make sense.
  If the operator is a . (dot), we concatenate it to the last item.
  If the operator is not a . (dot), we push it to the executeArray.
*/
  Calculator.prototype.handleOperator = function(operator) {
    if (!isNaN(this.getLastItem())) {
      if (operator === '.') {
        this.addToLast(operator);
      }
      else {
        this.executeArray.push(operator);
      }
      this.updateDisplay();
    }
  };

/*
  Method to clear the display. This will empty the executeArray.
*/
  Calculator.prototype.allClear = function(clear) {
    this.executeArray = [];
    this.updateDisplay();
  };

/*
  Method for the backspace. This will delete the last item in the executeArray.
*/
  Calculator.prototype.clearEntry = function() {
    this.executeArray[this.executeArray.length - 1] = this.getLastItem().toString().slice(0, -1);
    if (this.getLastItem().length < 1) {
      this.executeArray.pop();
    }
    this.updateDisplay();
  };

/*
  Method to do the math.
  If the last item in the executeArray is not a number we will remove it.
  Then we evaluate (eval) the executeArray, put the result in the executeArray and update the display.
*/
  Calculator.prototype.getTotal = function() {
    if (isNaN(this.getLastItem())) {
      this.executeArray.pop();
    }
    var total = eval(this.executeArray.join(''));
    this.executeArray = [total];
    this.updateDisplay();
  };

/*
  Initialize the calculator and give it the ID of the display element.
*/
  var jsCalculator = new Calculator('display');

/*
  Bind the buttons to the actions.
*/
  document.getElementById('ac').addEventListener('click', function() {
    jsCalculator.allClear();
  });

  document.getElementById('c').addEventListener('click', function(){
    jsCalculator.clearEntry();
  });

  document.getElementById('=').addEventListener('click', function(){
    jsCalculator.getTotal();
  });

  var operatorControls = document.getElementsByClassName('operatorbutton');
  var numberControls = document.getElementsByClassName('numberbutton');

    for (var i = 0; i < operatorControls.length; i++) {
      operatorControls[i].addEventListener('click', function() {
        jsCalculator.handleOperator(this.getAttribute('id'));
      });
    }

    for (var i = 0; i < numberControls.length; i++) {
      numberControls[i].addEventListener('click', function() {
        jsCalculator.handleNumber(this.getAttribute('id'));
      });
    }

/*
  Method to use the keyboard numbers and operators (using onkeypress).
  If the key is a number it will run the handleNumber method.
  If the key is a operator it will run the handleOperator method.
  If the key is backspace it will run the clearEntry method.
*/
  window.onkeypress = function(e) {
    e.preventDefault();
    var key = e.keyCode ? e.keyCode : e.which;

if (key >= 96 && key <= 105) {
    jsCalculator.handleNumber(key - 96);
} else if  (key >= 48 && key <= 57) {
    jsCalculator.handleNumber(key - 48);
} else if (key === 43) {
    jsCalculator.handleOperator('+');
} else if (key === 45) {
    jsCalculator.handleOperator('-');
} else if (key === 37) {
    jsCalculator.handleOperator('%');
} else if (key === 42) {
    jsCalculator.handleOperator('*');
} else if (key === 47) {
    jsCalculator.handleOperator('/');
} else if (key === 46) {
    jsCalculator.handleOperator('.');
} else if (key === 13) {
    jsCalculator.getTotal();
}

/*
  Method to use the keyboard backspace and delete (using onkeyup).
  If the key is delete it will run the allClear method.
  If the key is enter it will run the getTotal method.
*/
  window.onkeyup = function(e) {
    e.preventDefault();
    var key = e.keyCode ? e.keyCode : e.which;

 if (key === 8) {
    jsCalculator.clearEntry();
} else if (key === 46) {
    jsCalculator.allClear();
}
}
}})();