const modalBtn = document.getElementById('modal-open-btn');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('modal-close');
const submit = document.getElementById('location-submit-btn');

let currentTab = 0;

modalBtn.onclick = function () {
  modal.style.display = 'block';
};

closeBtn.onclick = function () {
  modal.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

const getNewLocation = () => {
  const location = document.getElementById('location-input').value;

  console.log('New Location Entered: ', location);
  return location;
};
/*
submit.onclick = () => {
    modal.style.display = 'none';
    const location = getNewLocation();
}
*/

let inputData = {};

const showTab = (n) => {
  let x = document.getElementsByClassName('tab');
  x[n].style.display = 'block';

  if (n == 0) {
    document.getElementById('prevBtn').style.display = 'none';
  } else {
    document.getElementById('prevBtn').style.display = 'inline';
  }

  if (n == x.length - 1) {
    document.getElementById('nextBtn').innerHTML = 'Submit';
  } else {
    document.getElementById('nextBtn').innerHTML = 'Next';
  }

  fixStepIndicator(n);
};

function submitAnswer(n) {
  let x = document.getElementsByClassName('tab');
  let inputs = document.querySelectorAll('.modal-input');

  let currentInput = inputs[currentTab];
  let inputKey = currentInput.getAttribute('data-key');
  let inputValue = currentInput.value;

  inputData[inputKey] = inputValue;

  if (n == 1 && !validateForm()) return false;

  x[currentTab].style.display = 'none';

  currentTab = currentTab + n;

  if (currentTab >= x.length) {
    modal.style.display = 'none';

    console.log('input: ', inputData);
    return inputData;
  }

  showTab(currentTab);
}

function validateForm() {
  let x,
    y,
    i,
    valid = true;

  x = document.getElementsByClassName('tab');
  y = x[currentTab].getElementsByTagName('input');

  if (valid) {
    document.getElementsByClassName('step')[currentTab].className += ' finish';
  }

  return valid;
}

function fixStepIndicator(n) {
  let i,
    x = document.getElementsByClassName('step');
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(' active', '');
  }

  x[n].className += ' active';
}

showTab(currentTab);

module.exports = { getNewLocation, submitAnswer };
