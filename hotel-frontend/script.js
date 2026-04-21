const API_URL = 'http://localhost:8080'
//API_URL = 'https://roma-rahti-test-my-first-project.2.rahtiapp.fi'
async function getRooms() {
    const res = await fetch(`${API_URL}/api/rooms`);
    const data = await res.json();

    const output = document.getElementById('booking-select');

    data.forEach(room => {
        output.innerHTML += `<option value="${room.id}">${room.room_type} - ${room.room_number} - ${room.price}€</option>`;
    });
}

async function getBookings() {
    const res = await fetch(`${API_URL}/api/bookings`).then(res => res.json());

    const output = document.getElementById('bookings-list');
    output.innerHTML = ``;

    res.forEach(booking => {
        output.innerHTML += `<li>Room ${booking.room_number} booked by ${booking.first_name} ${booking.last_name} from ${new Date(booking.date_from).toLocaleDateString()} for ${booking.nights} day(s), total price is ${booking.total_price}</li>`;
    });
}

async function getGuests() {
    const res = await fetch(`${API_URL}/api/guests`).then(res => res.json());

    const output = document.getElementById('guest-id');
    res.forEach(guest => {
        output.innerHTML += `<option value="${guest.id}">${guest.id} - ${guest.first_name} ${guest.last_name}</option>`;
    });
}

getRooms();
getBookings();
getGuests();

const form = document.getElementById('booking-form');

form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const data = Object.fromEntries(new FormData(form));

    const res = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    }).then(res => res.json());

    document.getElementById('result').innerText = res.id;
    getBookings();
});