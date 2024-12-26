let useOldNotation = true;
let E = x => new ExpantaNum(x);

let lastOperation = null;

function performOperation(operation) {
  const num1Str = document.getElementById("num1").value;
  const num2Str = document.getElementById("num2").value;

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
      result = num1.pentate(num2);
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
      result = num1.sqrt();
      break;
    case 'log':
      result = num1.log10(num2);
      break;
    case 'slog':
      result = num1.slog();
      break;
    case '2slog':
      result = num1.slog().slog();
      break;
    case 'logb':
      result = num2.logBase(num1);
      break;
  }

  document.getElementById("result").textContent = `${notate(result, 6)}`;
  lastOperation = { operation, num1: num1Str, num2: num2Str };
}



function toggleNotation() {
  useOldNotation = !useOldNotation;
  const resultElement = document.getElementById("result");
  const currentResult = resultElement.textContent;
  if (lastOperation) {
    performOperation(lastOperation.operation);
  }
}

function notate(expnum, fp) {
  const exp = ExpantaNum(expnum);

  if (useOldNotation) {
    if (exp.lt("1e12")) {
      return formatNumberWithCommas(exp.toNumber().toFixed(fp));
    } else if (exp.slog(10).lt(1000000000000000) && exp.slog(10).gte(1.5)) {
      return formatNumberWithCommas(exp.toExponential(fp));
    } else if (exp.lt("10^^1000000000000000")) {
      return "10^^" + notate(exp.slog(10), fp);
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
}

function formatNumberWithCommas(num) {
  return num.toLocaleString();
}

function repeatLastOperation() {
  setInterval(() => {
    if (lastOperation) {
      performOperation(lastOperation.operation);
    }
  }, 100);
}

repeatLastOperation();
