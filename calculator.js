let notationFormat = 'expanta';
let E = x => new ExpantaNum(x);
let lastOperation = null;
function performOperation(operation) {
  const num1Str = document.getElementById("num1").value.replace(/,/g, '');
  const num2Str = document.getElementById("num2").value.replace(/,/g, '');
  const arrowCountInput = document.getElementById('arrowCount');
  const arrowCount = E(arrowCountInput.value);
  const num1 = E(num1Str);
  const num2 = E(num2Str);
  let result;

    switch (operation) {
        case 'add': result = num1.add(num2); break;
        case 'subtract': result = num1.sub(num2); break;
        case 'multiply': result = num1.mul(num2); break;
        case 'divide': result = num1.div(num2); break;
        case 'exponentiate': result = num1.pow(num2); break;
        case 'tetrate': result = num1.tetr(num2); break;
        case 'pentate': result = num1.pentate(num2); break;
        case 'hexate': result = num1.hexate(num2); break;
        case 'factorial': result = num1.factorial(); break;
        case 'sqrt': result = ExpantaNum(10).pow(ExpantaNum(num1).log10().div(2)); break;
        case 'cbrt': result = ExpantaNum(10).pow(ExpantaNum(num1).log10().div(3)); break;
        case 'log': result = num1.log10(); break;
        case 'ln': result = num1.log(); break;
        case 'slog': result = num1.slog(num2); break;
        case '2slog': result = num1.slog().slog(); break;
        case 'logb': result = num1.logBase(num2); break;
        case 'root': result = ExpantaNum(10).pow(ExpantaNum(num1).log10().div(num2)); break;
        case 'ssqrt': result = num1.ssqrt(); break;
        case 'plog': result = plog(num1); break;
        case 'expansion': result = ExpantaNum.expansion(num1,num2); break;
        case 'Arrows': result = ExpantaNum.arrow(num1,arrowCount,num2); break;
    }

  document.getElementById("result").textContent = `${notate(result, 6)}`;
  lastOperation = { operation, num1: num1Str, num2: num2Str };
}



function toggleNotationPopup() {
  const popup = document.getElementById("notationPopup");
  popup.style.display = popup.style.display === "block" ? "none" : "block";
}

function setNotation(format) {
  notationFormat = format;
  toggleNotationPopup();

  const resultElement = document.getElementById("result");
  if (lastOperation) {
    performOperation(lastOperation.operation);
  }
}

// used all my brain power to make this work
function plog(num) {
    if (!(num instanceof ExpantaNum)) num = new ExpantaNum(num);
    let pol = polarize(num.array, true);
    if (ExpantaNum.lt(num,1e10)) {
        return num.slog().slog().add(1).toString();
    }
    if (pol.height === 1) {
        return ExpantaNum.log10(pol.top).add(ExpantaNum.log10(pol.bottom)).add(1).toString();
    }
    if (pol.height === 3) {
        return ExpantaNum.hexate(ExpantaNum.pent(10,pol.bottom), ExpantaNum(pol.top).sub(1)).toString();
    }
    if (pol.height >= 4) {
        return num.toString();
    }
    return ExpantaNum(pol.top).add(ExpantaNum.log10(pol.bottom)).toString(); 
}
function notate(expnum) {
  const exp = ExpantaNum(expnum);

  switch (notationFormat) {
    
    case 'hyper':
      if (exp.gte(ExpantaNum.arrow(10, 20, 10))) {
          return format(exp, 6, small=false);
      }
      else {
        return exp.toHyperE()
      }
    case 'expanta':
      return format(exp, 6, small=false);
    case 'test':
      return (ExpantaNum(exp));
  }
}
function repeatLastOperation() {
  setInterval(() => {
    if (lastOperation) {
      performOperation(lastOperation.operation);
    }
  }, 10);
}

repeatLastOperation();
