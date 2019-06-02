let lowerLimit = 80;
let upperLimit = 120;
let totalNumbers = 6;
let numbersPerSecond = 2;

let prev;
let sum;
let total;
let average;
let locked = true;
let interval;

window.counting = false;

document.addEventListener('keydown', keyDownHandler);
document.getElementById('lowerLimit').value = lowerLimit;
document.getElementById('upperLimit').value = upperLimit;
document.getElementById('totalNumbers').value = totalNumbers;
document.getElementById('numbersPerSecond').value = numbersPerSecond;

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
  child.className = className + ' alert-dismissible';
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
