const modalBtn = document.getElementById('modal-open-btn');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('modal-close');



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

let inputData = {};
let userData = {}

const sendData = (data = {}) => {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const sentData = JSON.stringify(data);

  let options = {
    method: 'POST',
    headers: myHeaders,
    body: sentData,
    redirect: 'follow',
  };

  fetch('http://localhost:3000/new', options)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log('error posting trip: ', error));
};

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

async function submitAnswer (n) {
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
    sendData(inputData);
    
    const trips = await Travel.getUserTrips();
    
    return inputData;
  }

  showTab(currentTab);
}

function validateForm() {
  let x, y,
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

const sendLoginData = async () => {

  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');


  let options = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  }

  fetch('http://localhost:3000/login', options).then((result) => {
    console.log(result)
  }).catch(err => console.log('login err: ', err));

}

export {  submitAnswer, sendLoginData };
