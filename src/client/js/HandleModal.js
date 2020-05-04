const modalBtn = document.getElementById('modal-open-btn');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('modal-close');
const submit = document.getElementById('location-submit-btn');

modalBtn.onclick = function () {
    modal.style.display = 'block';
}

closeBtn.onclick = function () {
    modal.style.display = 'none';
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

const getNewLocation = () => {
    const location = document.getElementById('location-input').value 

    console.log('New Location Entered: ', location);
    return location;
}

submit.onclick = () => {
    modal.style.display = 'none';
    const location = getNewLocation();
}

module.exports = { getNewLocation };