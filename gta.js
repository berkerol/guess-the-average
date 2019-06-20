const defaultLowerLimit = 80;
const defaultUpperLimit = 120;
const defaultTotalNumbers = 6;
const defaultNumbersPerSecond = 2;
let lowerLimit = defaultLowerLimit;
let upperLimit = defaultUpperLimit;
let totalNumbers = defaultTotalNumbers;
let numbersPerSecond = defaultNumbersPerSecond;

let prev;
let sum;
let total;
let average;
let locked = true;
let interval;

window.counting = false;

const form = document.getElementsByTagName('form')[0];
const menu = document.getElementById('menu');
const rowClass = 'form-row justify-content-center';
const colClass = 'form-group col-5 col-md-4 col-lg-3';
for (const row of [[['Lower Limit', 'lowerLimit', '1', '99999'], ['Total Numbers', 'totalNumbers', '3', '999']], [['Upper Limit', 'upperLimit', '1', '99999'], ['Numbers/Second', 'numbersPerSecond', '1', '9']]]) {
  const divRow = document.createElement('div');
  divRow.className = rowClass;
  for (const col of row) {
    const label = document.createElement('label');
    label.htmlFor = col[1];
    label.innerHTML = col[0];
    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'form-control';
    input.id = col[1];
    input.min = col[2];
    input.max = col[3];
    const divCol = document.createElement('div');
    divCol.className = colClass;
    divCol.appendChild(label);
    divCol.appendChild(input);
    divRow.appendChild(divCol);
  }
  form.insertBefore(divRow, menu);
}
resetInputs();
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function resetInputs () {
  document.getElementById('lowerLimit').value = lowerLimit;
  document.getElementById('upperLimit').value = upperLimit;
  document.getElementById('totalNumbers').value = totalNumbers;
  document.getElementById('numbersPerSecond').value = numbersPerSecond;
}

function draw () {
  if (total === totalNumbers) {
    document.getElementById('number').innerHTML = '';
    window.clearInterval(interval);
    average = Math.floor(sum / totalNumbers);
    window.counting = false;
    locked = false;
    return;
  }
  let number;
  do {
    number = Math.floor(Math.random() * (upperLimit - lowerLimit + 1) + lowerLimit);
  } while (number === prev);
  prev = number;
  sum += number;
  total++;
  document.getElementById('number').innerHTML = number;
}

window.start = function () {
  lowerLimit = +document.getElementById('lowerLimit').value;
  upperLimit = +document.getElementById('upperLimit').value;
  totalNumbers = +document.getElementById('totalNumbers').value;
  numbersPerSecond = +document.getElementById('numbersPerSecond').value;
  prev = 0;
  sum = 0;
  total = 0;
  locked = true;
  window.counting = true;
  interval = window.setInterval(draw, 1000 / numbersPerSecond);
  document.getElementById('text').innerHTML = '';
};

function guess () {
  const input = document.getElementById('guess');
  const guess = parseInt(input.value);
  input.value = '';
  if (isNaN(guess)) {
    write('alert alert-danger', 'Not a number.');
  } else {
    if (average === guess) {
      exit('alert alert-success', guess + ' is correct.');
    } else {
      exit('alert alert-warning', average + ' is the average.');
    }
  }
}

window.giveUp = function () {
  exit('alert alert-danger', average + ' is the average.');
};

function exit (className, text) {
  write(className, text);
  locked = true;
  write('alert alert-info', 'Restart the game!');
}

function write (className, text) {
  const child = document.createElement('div');
  child.className = className + ' alert-dismissible fade show';
  child.innerHTML = '<button type="button" class="close" data-dismiss="alert"><span>&times;</span></button>' + text;
  const parent = document.getElementById('text');
  parent.insertBefore(child, parent.firstChild);
}

function keyDownHandler (e) {
  if (e.keyCode === 13 && !locked) {
    e.preventDefault();
    guess();
  }
}

function keyUpHandler (e) {
  if (e.keyCode === 82) {
    lowerLimit = defaultLowerLimit;
    upperLimit = defaultUpperLimit;
    totalNumbers = defaultTotalNumbers;
    numbersPerSecond = defaultNumbersPerSecond;
    resetInputs();
  }
}
