const title = document.getElementById('title')

const getUserTrips = () => {
    return fetch('http://localhost:3000/all').then((result) => result.json()).then(response => {
        console.log(response);
        return response;
    }).catch(err => {
        console.log(err)
    })
}

const updateUi = (data) => {
    title.textContent = `Your Trip to ${data.location}!`

    let date = data.departure;
    if (date !== '') {
        countdownTimer(date);
    }
}

const countdownTimer = (date) => {
    let countDownDate = new Date(date).getTime();

    let x = setInterval(function () {
        let now = new Date().getTime();

        let distance = countDownDate - now;

        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('countdown-timer').innerHTML = days + ' days ' + hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds til takeoff';

        if (distance < 0) {
            clearInterval(x);
            document.getElementById('countdown-timer').innerHTML = "Bon voyage!"
        }

    }, 1000)
}

const getGeodata = async (city) => {
    //Todo: implement post to server to get geodata
}

const displayTrips = async () => {
    const trips = await getUserTrips();
    const tripsSection = document.getElementById('user-trips');
    const list = document.getElementById('trip-list');

    trips.forEach((trip) => {
        const li = document.createElement('li');
        li.setAttribute('data-id', trip._id);
        li.textContent = trip.location

        li.onclick = () => {
            getGeodata(trip.location);
        }

        list.appendChild(li);
    })


}

displayTrips();

export { getUserTrips, updateUi, displayTrips };