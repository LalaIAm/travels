const modalBtn = document.getElementById('modal-open-btn');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('modal-close');

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
    return location;
}

module.exports = { getNewLocation };