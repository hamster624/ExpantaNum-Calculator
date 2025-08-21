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
        case 'hlog': result = hlog(num1); break; 
        case 'heplog': result = heplog(num1); break; 
        case 'olog': result = olog(num1); break; 
        case 'ultralog': result = ultralog(num1, num2); break; 
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
// btw if you are going to steal this at least credit the creators github account: hamster624
// used all my brain power to make this work
function plog(num) {
    if (!(num instanceof ExpantaNum)) num = new ExpantaNum(num);
    let pol = polarize(num.array, true);
    if (ExpantaNum.eq(pol.height, 1)) {
        return num.slog().slog().add(1).toString();
    }
    if (ExpantaNum.eq(pol.height, 3)) {
        return ExpantaNum.hexate(ExpantaNum.pent(10,pol.bottom), ExpantaNum(pol.top).sub(1)).toString();
    }
    if (ExpantaNum.gte(pol.height, 4)) {
        return num.toString();
    }
    return ExpantaNum(pol.top).add(ExpantaNum.log10(pol.bottom)).toString(); 
}
// this one was easier
function hlog(num) {
    if (!(num instanceof ExpantaNum)) num = new ExpantaNum(num);
    let pol = polarize(num.array, true);
    if (ExpantaNum.lte(num, "10^^^10")) {
        return ExpantaNum(plog(plog(num))).add(1).toString();
    }
    if (ExpantaNum.gt(num, "10^^^10") && ExpantaNum.lt(num, "10^^^^10")) {
        return ExpantaNum.log10(pol.bottom).add(pol.top).toString();
    }
    if (ExpantaNum.eq(pol.height, 4)) {
        return ExpantaNum.heptate(ExpantaNum.hexate(10,pol.bottom), ExpantaNum(pol.top).sub(1)).toString();
    }
    if (ExpantaNum.gte(pol.height, 5)) {
      return num.toString();
    }
}
// i think i have too much logs
function heplog(num) {
    if (!(num instanceof ExpantaNum)) num = new ExpantaNum(num);
    let pol = polarize(num.array, true);
    if (ExpantaNum.lte(num, "10^^^^10")) {
        return ExpantaNum(hlog(num)).log10().add(1).toString();
    }
    if (ExpantaNum.lt(num, "10^^^^^10") && ExpantaNum.gte(num, "10^^^^10")) {
        return ExpantaNum.log10(pol.bottom).add(pol.top).toString();
    }
    if (ExpantaNum.eq(pol.height, 5)) {
      return ExpantaNum.octate(ExpantaNum.heptate(10,pol.bottom), ExpantaNum(pol.top).sub(1)).toString();
    }
    if (ExpantaNum.gt(pol.height, 5)) {
      return num.toString();
    }
}
// not enough logs
function olog(num) {
    if (!(num instanceof ExpantaNum)) num = new ExpantaNum(num);
    let pol = polarize(num.array, true);
    if (ExpantaNum.lte(num, "10^^^^^10")) {
        return ExpantaNum(heplog(num)).log10().add(1).toString();
    }
    if (ExpantaNum.lt(num, "10^^^^^^10") && ExpantaNum.gte(num, "10^^^^^10")) {
        return ExpantaNum.log10(pol.bottom).add(pol.top).toString();
    }
    if (ExpantaNum.eq(pol.height, 6)) {
      return ExpantaNum.arrow(ExpantaNum.arrow(10,6,pol.bottom), 7, ExpantaNum(pol.top).sub(1)).toString();
    }
    if (ExpantaNum.gt(pol.height, 6)) {
      return num.toString();
    }
}
// yeah okay i wont be rewriting the code each time so uhh here is ultra log
function ultralog(num, arrows) {
    if (!(num instanceof ExpantaNum)) num = new ExpantaNum(num);
    let pol = polarize(num.array, true);
    num = num.array;
    if (ExpantaNum.eq(arrows, 1)){
      return ExpantaNum.log10(num).toString();
    }
    if (ExpantaNum.eq(arrows, 2)){
      return ExpantaNum.slog(num).toString();
    }
    if (ExpantaNum.eq(arrows, 3)){
      return plog(num);
    }
    if (ExpantaNum.eq(arrows, 4)){
      return hlog(num);
    }
    if (ExpantaNum.eq(arrows, 5)){
      return heplog(num);
    }
    if (ExpantaNum.eq(arrows, 6)){
      return olog(num);
    }
    if (ExpantaNum.gt(arrows, 6) && ExpantaNum.lte(arrows,20)){
      if (ExpantaNum.lte(num, ExpantaNum.arrow(10, ExpantaNum(arrows).sub(1), 10))) {
        return ExpantaNum(ultralog(ExpantaNum(num), ExpantaNum(arrows).sub(1))).log10().add(1).toString();
      }
      if (ExpantaNum.lt(num, ExpantaNum.arrow(10, ExpantaNum(arrows), 10)) && ExpantaNum.gte(num, ExpantaNum.arrow(10, ExpantaNum(arrows).sub(1), 10))) {
        return ExpantaNum.log10(pol.bottom).add(pol.top).toString();
      }
      if (ExpantaNum.eq(arrows, pol.height)) {
        return ExpantaNum.arrow(ExpantaNum.arrow(10,ExpantaNum(arrows),pol.bottom), ExpantaNum(arrows).add(1), ExpantaNum(pol.top).sub(1)).toString();
      }
      if (ExpantaNum.gt(pol.height, arrows)) {
        return ExpantaNum(num).toString();
      }
    }
    if (ExpantaNum.gt(arrows, 20)){
      throw Error("Max 20 arrows due to precision");
    }
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
  }, 17);
}

repeatLastOperation();
