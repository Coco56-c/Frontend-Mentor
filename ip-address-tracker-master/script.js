const input = document.getElementById("ip-adress");
const form = document.getElementById("ip-form");

const ipResult = document.getElementById("ip-result");
const locationResult = document.getElementById("location-result");
const timezoneResult = document.getElementById("timezone-result");
const ispResult = document.getElementById("isp-result");
const searchError = document.getElementById("search-error");

// -------------------------
// LEAFLET
// -------------------------

const map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const customIcon = L.icon({
    iconUrl: "./images/icon-location.svg",
    iconSize: [50, 50],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});

let marker = L.marker([51.505, -0.09], {
    icon: customIcon
}).addTo(map);


// -------------------------
// API IPIFY
// -------------------------

async function searchIP(ip) {

    // Efface le message d'erreur
    searchError.textContent = "";

    try {

        const response = await fetch(
            `https://ip-tracker-api.cor-crocq.workers.dev/?ip=${encodeURIComponent(ip)}`
        );

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données");
        }

        const data = await response.json();

        console.log(data);

        // Informations
        ipResult.textContent = data.ip;

        locationResult.textContent =
            `${data.location.city}, ${data.location.country}`;

        timezoneResult.textContent =
            `UTC ${data.location.timezone}`;

        ispResult.textContent = data.isp;

        // Carte
        map.setView(
            [data.location.lat, data.location.lng],
            13
        );

        marker.setLatLng([
            data.location.lat,
            data.location.lng
        ]);

    } catch (error) {

        console.error(error);

        searchError.textContent =
            "Nothing found for that IP address or domain.";
    }
}


// -------------------------
// RECHERCHE
// -------------------------

form.addEventListener("submit", (event) => {

    event.preventDefault();

    const ip = input.value.trim();

    if (ip === "") {
        return;
    }

    searchIP(ip);
});


// -------------------------
// PREMIÈRE RECHERCHE
// -------------------------

searchIP("");
