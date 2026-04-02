//const API_URL = 'http://localhost:8080'
API_URL = 'https://roma-rahti-test-my-first-project.2.rahtiapp.fi'
async function getRooms() {
    const res = await fetch(`${API_URL}/api/rooms`);
    const data = await res.json();

    const output = document.getElementById('rooms');

    data.forEach(room => {
        output.innerHTML += `<p>The room with number ${room.number} is ${room.type}</p>`;
    });
}

getRooms();