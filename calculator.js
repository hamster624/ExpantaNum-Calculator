let notationFormat = 'expanta';
let E = x => new ExpantaNum(x);

let lastOperation = null;

function performOperation(operation) {
  const num1Str = document.getElementById("num1").value.replace(/,/g, '');
  const num2Str = document.getElementById("num2").value.replace(/,/g, '');

  const num1 = E(num1Str);
  const num2 = E(num2Str);
  let result;

  switch (operation) {
    case 'add':
      result = num1.add(num2);
      break;
    case 'subtract':
      result = num1.sub(num2);
      break;
    case 'multiply':
      result = num1.mul(num2);
      break;
    case 'divide':
      result = num1.div(num2);
      break;
    case 'exponentiate':
      result = num1.pow(num2);
      break;
    case 'tetrate':
      result = num1.tetr(num2);
      break;
    case 'pentate':
      result = num1.pentate(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
      break;
    case 'hexate':
      result = num1.hexate(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
      break;
    case 'heptate':
      result = num1.heptate(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
      break;
    case 'octate':
      result = num1.octate(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
      break;
    case 'nonate':
      result = num1.nonate(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
      break;
    case 'decate':
      result = num1.decate(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
      break;
    case 'unodecate':
      result = num1.unodecate(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
      break;
    case 'dodecate':
      result = num1.dodecate(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
      break;
    case 'tridocate':
      result = num1.tridocate(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
      break;
    case 'quadocate':
      result = num1.quadocate(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
      break;
    case 'quindecate':
      result = num1.quindecate(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
      break;
    case 'sedecate':
      result = num1.sedecate(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
      break;
    case 'septendecate':
      result = num1.septendecate(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
      break;
    case '1000arrow':
      result = num1.big(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
      break;
    case '10000arrow':
      result = num1.big2(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
      break;
    case '100000arrow':
      result = num1.big3(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
      break;
    case '1000000arrow':
      result = num1.big4(num2); // Custom operation which means ExpantaNum doesnt have it while my modified one has it
      break;
    case 'factorial':
      result = num1.factorial();
      break;
    case 'sqrt':
      result = ExpantaNum(10).pow(ExpantaNum(num1).log10().div(2));
      break;
    case 'log':
      result = num1.log10();
      break;
    case 'slog':
      result = num1.slog();
      break;
    case '2slog':
      result = num1.slog().slog();
      break;
    case 'logb':
      result = num1.logBase(num2);
      break;
    case 'custom_sqrt':
      result = ExpantaNum(10).pow(ExpantaNum(num1).log10().div(num2));
      break;
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

function notate(expnum, fp) {
  const exp = ExpantaNum(expnum);

  switch (notationFormat) {
    case 'hyper':
      let str = exp.toHyperE();
      str = str.replace(/#0/g, '');
      str = str.replace(/(#1)+/g, (match, p1) => {
        const repeatCount = match.length / p1.length;
        if (repeatCount === 1) {
          return '';
        }
        return `(#1^${repeatCount})`;
      });
      return str;

    case 'my':
      if (exp.lt("1e12")) {
        return commaFormat(exp, 2);
      } else if (exp.lt("10^^^^^10") && exp.gte("1e12")) {
        return format(exp, 2, small=false);
      } else {
        let str = exp.toHyperE();
        str = str.replace(/#0/g, '');
        str = str.replace(/(#1)+/g, (match, p1) => {
          const repeatCount = match.length / p1.length;
          if (repeatCount === 1) {
            return '';
          }
          return `(#1^${repeatCount})`;
        });
        return str;
      }
    case 'expanta':
      if (exp.lt("E10#5")&& exp.gte("E10#4"))
        return "eeee" + (exp.log10().log10().log10().log10());
      else if (exp.lt("E10#4")&& exp.gte("E10#3"))
        return "eee" + (exp.log10().log10().log10());
      else if (exp.lt("E10#3")&& exp.gte("E10#2"))
        return "ee" + (exp.log10().log10());
      else if (exp.gte("E10#5"))
        return format(exp, 6, small=false);
      else if (exp.lt("E10#2"))
        return format(exp, 6, small=false);
    case 'test':
      return (exp.toExponential(fp));
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
