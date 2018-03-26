// Objects
  // ['Data'(Object)] for Main Calculator Variables/Functions
const data = {
  history: [],
  equation: '',
  firstTerm: 0,
  currentOperator:'',
    numberButton: val => {
    	if (data.currentOperator === '=') {
    		data.clearDisplay();
    		data.currentOperator = '';
      }
    	data.displayValue(val);
    },
    higherOperation: operator => {
      const val = document.getElementById('display').innerHTML;
    	let x;
      let y;
    	let xOperated;
    	if (val === ''){
    		x = data.firstTerm;
    	} else {
    		x = document.getElementById('display').innerHTML;
    		y = data.firstTerm;
    	}
      switch (operator) {
        case '/100':
    	    const percentOfX = parseFloat((x /100).toFixed(9));
    	    if (!y) {
    		    xOperated = parseFloat((x * percentOfX).toFixed(9)).toString();
    	    } else {
    		    xOperated = parseFloat((y * percentOfX).toFixed(9)).toString();
    	    }
          break;
    	  case 'Math.sqrt':
    		  if (x < 0){
    		    document.getElementById('display').innerHTML = 'Error!';
    		  }	else {
    		    xOperated = parseFloat(eval(`${operator}(${x})`).toFixed(9)).toString();
    		  }
          break;
    	  case '**2':
    		  xOperated = parseFloat(eval(`${x}${operator}`).toFixed(9)).toString();
          break;
    	  case '1/':
    		  xOperated = parseFloat(eval(`${operator}${x}`).toFixed(9)).toString();
          break;
    	  case '0-':
    		  xOperated = parseFloat((0 - x).toFixed(9)).toString();
          break;
    	}
    	if (xOperated.length > 11) {
    		xOperated = xOperated.substring(0,11);
    	}
      document.getElementById('display').innerHTML = xOperated;
    },
    basicOperation: operator => {
      const val = document.getElementById('display').innerHTML;
    	if (val !== ''){
    		data.firstTerm = document.getElementById('display').innerHTML;
    		data.currentOperator = operator;
    		if (operator !== '='){
    			data.equation += `${data.firstTerm} ${data.currentOperator} `;
    		} else {
    			data.equation += `${data.firstTerm} `;
    		}
    		data.history.push(`${data.firstTerm} ${data.currentOperator} `);
    		data.displayValueSecondary(data.equation);
    		data.clearDisplay();
    	}
    	if (operator === '=') {
    		let e = parseFloat(eval(data.equation).toFixed(9)).toString();
    		if (e.length > 11) {
    			e = e.substring(0,11);
    		}
    		data.displayValue(e);
    		data.history.push(`${data.equation}= ${e}`);
    		data.equation = '';
    		data.clearSecondaryDisplay();
    	}
    },
    displayValue: val => {
      const input = document.getElementById('display').innerHTML;
    	if (input.length < 11) {
    		document.getElementById('display').innerHTML += val;
    	}
    },
    displayValueSecondary: val => {
    	document.getElementById('secondary-display').innerHTML = '';
    	document.getElementById('secondary-display').innerHTML += val;
    },
    clearData: () => {
    	data.equation = '';
    	data.firstTerm = 0;
    	data.currentOperator = '';
    },
    clearEquation: () => {
    	data.equation = '';
    },
    clearDisplay: () => {
    	document.getElementById('display').innerHTML = '';
    },
    clearSecondaryDisplay: () => {
    	document.getElementById('secondary-display').innerHTML = '';
    },
};

  // ['Memory'(Object)] for Calculator Memory Variables/Functions
const memory = {
  history: [],
  firstTerm: 0,
  secondTerm: 0,
  notInUse: true,
  specialButtons: document.getElementsByClassName('not-in-use'),
    memoryHistory: (x, operator, y, e) => {
      if (operator) {
    		const equationString = `${x} ${operator} ${y} = ${e}`;
    		memory.history.push(equationString);
    	} else {
    		memory.firstTerm = document.getElementById('display').innerHTML;
    		memory.history.push(memory.firstTerm);
    	}
    },
    toggleMemory: boolean => {
      memory.notInUse = boolean;
    	if (memory.notInUse) {
    		for (let i = 0; i < memory.specialButtons.length; i++){
    			memory.specialButtons[i].style.color = 'rgba(0,0,0,0.5)';
    		}
      } else {
    		for (let i = 0; i < memory.specialButtons.length; i++){
    			memory.specialButtons[i].style.color = 'rgba(0,0,0,1)';
    		}
    	}
    },
    memoryMath: operator => {
      memory.secondTerm = document.getElementById('display').innerHTML;
    	const x = parseInt(memory.firstTerm);
    	const y = parseInt(memory.secondTerm);
    	const e = parseFloat(eval(`x ${operator} y`).toFixed(9)).toString();
    	memory.memoryHistory(memory.firstTerm, '+', memory.secondTerm, e);
    	memory.firstTerm = e;
    	memory.toggleMemory(false);
    },
    clearMemory: () => {
      memory.history = [];
    	memory.firstTerm = 0;
    	memory.secondTerm = 0;
    	memory.toggleMemory(true);
    },
  }

// EVENT LISTENERS
  //Menu/History Buttons Working!! (somewhat?!?)
document.getElementById('menu').addEventListener('click', () => {
  console.log('Under Construction!');
})
document.getElementById('history').addEventListener('click', () => {
  console.log(data.history);
  console.log(data);
})

  // Memory ---> Buttons Working! ---> Revised
document.getElementById('memory-clear').addEventListener('click', () => {
  memory.clearMemory();
  data.clearDisplay();
})
document.getElementById('memory-recall').addEventListener('click', () => {
  document.getElementById('display').innerHTML = memory.firstTerm;
})
document.getElementById('memory-add').addEventListener('click', () => {
  memory.memoryMath('+');
  data.clearDisplay();
})
document.getElementById('memory-subtract').addEventListener('click', () => {
  memory.memoryMath('-');
  data.clearDisplay();
})
document.getElementById('memory-store').addEventListener('click', () => {
  memory.memoryHistory();
  memory.toggleMemory(false);
  data.clearDisplay();
})
document.getElementById('memory-history').addEventListener('click', () => {
  console.log(memory.history);
  console.log(memory);
})

  // Row 1 ---> Buttons Working! ---> Revised
document.getElementById('percent').addEventListener('click', () => {
  data.higherOperation('/100');
})
document.getElementById('squareroot').addEventListener('click', () => {
  data.higherOperation('Math.sqrt');
})
document.getElementById('power').addEventListener('click', () => {
  data.higherOperation('**2');
})
document.getElementById('reciprocal').addEventListener('click', () => {
  data.higherOperation('1/');
})

  // Row 2 ---> Buttons Working! ---> Revised
document.getElementById('clear-entry').addEventListener('click', () => {
  data.clearDisplay();
})
document.getElementById('clear-all').addEventListener('click', () => {
  data.clearData();
  memory.clearMemory();
  data.clearDisplay();
  data.clearSecondaryDisplay();
})
document.getElementById('backspace').addEventListener('click', () => {
  const input = document.getElementById('display').innerHTML;
  data.clearDisplay();
  data.displayValue(input.slice(0, -1));
})
document.getElementById('divide').addEventListener('click', () => {
  data.basicOperation('/');
})

  // Row 3 ---> Buttons Working! ---> Revised
document.getElementById('btn-7').addEventListener('click', function() {
  data.numberButton(this.innerHTML);
})
document.getElementById('btn-8').addEventListener('click', function() {
  data.numberButton(this.innerHTML);
})
document.getElementById('btn-9').addEventListener('click', function() {
  data.numberButton(this.innerHTML);
})
document.getElementById('multiply').addEventListener('click', () => {
  data.basicOperation('*');
})

  // Row 4 ---> Buttons Working! ---> Revised
document.getElementById('btn-4').addEventListener('click', function() {
  data.numberButton(this.innerHTML);
})
document.getElementById('btn-5').addEventListener('click', function() {
  data.numberButton(this.innerHTML);
})
document.getElementById('btn-6').addEventListener('click', function() {
  data.numberButton(this.innerHTML);
})
document.getElementById('minus').addEventListener('click', () => {
  data.basicOperation('-');
})

  // Row 5 ---> Buttons Working! ---> Revised
document.getElementById('btn-1').addEventListener('click', function() {
  data.numberButton(this.innerHTML);
})
document.getElementById('btn-2').addEventListener('click', function() {
  data.numberButton(this.innerHTML);
})
document.getElementById('btn-3').addEventListener('click', function() {
  data.numberButton(this.innerHTML);
})
document.getElementById('add').addEventListener('click', () => {
  data.basicOperation('+');
})

  // Row 6 ---> Buttons Working! ---> Revised
document.getElementById('plus-minus').addEventListener('click', () => {
  data.higherOperation('0-');
})
document.getElementById('btn-0').addEventListener('click', function() {
  data.numberButton(this.innerHTML);
})
document.getElementById('decimal').addEventListener('click', function() {
  const input = document.getElementById('display').innerHTML;
  if (!input.includes('.')) {
  data.displayValue(this.innerHTML);
  }
})
document.getElementById('evaluate').addEventListener('click', () => {
  data.basicOperation('=');
})
