/* global createNumberCol createNumberRow createButtonGroupRow createRow createAlert exit keyDownHandler keyUpHandler */
const defaultLowerLimit = 80;
const defaultUpperLimit = 120;
const defaultTotalNumbers = 6;
const defaultNumbersPerSecond = 2;
let lowerLimit;
let upperLimit;
let totalNumbers;
let numbersPerSecond;

let prev;
let sum;
let total;
let average;
let interval;

window.locked = true;
window.counting = false;

const form = document.getElementById('form');
const rowClass = 'row justify-content-center';
const colClass = 'col-5 col-md-4 col-lg-3 mb-3';
const numberClass = 'col-3 col-lg-2 mb-3';
const buttonClass = 'col-7 col-md-5 col-lg-4 my-auto';
const firstRow = [['Lower Limit', 'lowerLimit', '1', '99999'], ['Total Numbers', 'totalNumbers', '3', '999']];
const secondRow = [['Upper Limit', 'upperLimit', '1', '99999'], ['Numbers/Second', 'numbersPerSecond', '1', '9']];
const numberRow = ['Guess', 'guess', '1', '99999'];
const buttonRow = [['success', 'if(!locked)window.guess()', 'g', 'search', '<u>G</u>uess'], ['danger', 'if(!locked)giveUp()', 'u', 'times', 'Give <u>U</u>p'], ['info', 'if(!counting)start()', 's', 'play', '<u>S</u>tart']];
form.appendChild(createNumberRow(rowClass, colClass, firstRow));
form.appendChild(createNumberRow(rowClass, colClass, secondRow));
form.appendChild(createRow(rowClass, [createNumberCol(numberClass, ...numberRow), createButtonGroupRow(buttonClass, 'btn-group', buttonRow)]));
resetInputs();
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function resetInputs () {
  lowerLimit = defaultLowerLimit;
  upperLimit = defaultUpperLimit;
  totalNumbers = defaultTotalNumbers;
  numbersPerSecond = defaultNumbersPerSecond;
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
    window.locked = false;
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
  window.locked = true;
  window.counting = true;
  interval = window.setInterval(draw, 1000 / numbersPerSecond);
  document.getElementById('text').innerHTML = '';
};

window.guess = function () {
  const input = document.getElementById('guess');
  const guess = parseInt(input.value);
  input.value = '';
  if (isNaN(guess)) {
    createAlert('danger', 'Not a number.');
  } else {
    if (average === guess) {
      exit('success', guess + ' is correct.');
    } else {
      exit('warning', average + ' is the average.');
    }
  }
};

window.giveUp = function () {
  exit('danger', average + ' is the average.');
};
