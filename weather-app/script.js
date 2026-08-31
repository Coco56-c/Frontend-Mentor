/*************************************************
 * VARIABLES
 *************************************************/

const unitsButton = document.querySelector(".dropdown-btn");
const unitsMenu = document.querySelector(".units-menu");

const dayButton = document.querySelector(".dropdown-day");
const dayMenu = document.querySelector(".day-menu");

const searchInput = document.querySelector("#city-search");
const searchButton = document.querySelector("#search");

const suggestionsList =
    document.querySelector("#suggestions-list");

const errorMessage =
    document.querySelector(".msgerreur");

const currentLoading =
    document.querySelector(".current-loading");

const currentWeatherCard =
    document.querySelector(".current-weather");

const retryButton =
    document.querySelector(".retry");

const weatherApp =
    document.querySelector("#weather-app");

const currentWeatherInfo =
    document.querySelector(".current-weather-info");

const currentTemperature =
    document.querySelector(".current-temperature");

let currentWeather = null;
let currentLocation = null;


/*************************************************
 * UNITÉS ACTUELLES
 *************************************************/

let currentUnits = {
    temperature: "celsius",
    windSpeed: "kmh",
    precipitation: "mm"
};


/*************************************************
 * OUVRIR / FERMER LE MENU UNITS
 *************************************************/

unitsButton.addEventListener("click", function (event) {

    event.stopPropagation();

    unitsButton.classList.toggle("active");

});


/*************************************************
 * GESTION DES UNITÉS
 *************************************************/

document
    .querySelectorAll(".dropdown-section .option")
    .forEach(option => {

        option.addEventListener("click", async function () {

            const type = this.dataset.type;
            const value = this.dataset.value;


            /*****************************************
             * SÉLECTION VISUELLE
             *****************************************/

            const section =
                this.closest(".dropdown-section");

            section
                .querySelectorAll(".option")
                .forEach(option => {

                    option.classList.remove("selected");

                });

            this.classList.add("selected");


            /*****************************************
             * MODIFIER L'UNITÉ
             *****************************************/

            if (type === "temperature") {
                currentUnits.temperature = value;
            }

            if (type === "wind-speed") {
                currentUnits.windSpeed = value;
            }

            if (type === "precipitation") {
                currentUnits.precipitation = value;
            }


            console.log(
                "Unités actuelles :",
                currentUnits
            );


            /*****************************************
             * RECHARGER LA MÉTÉO
             *****************************************/

            if (currentLocation) {
                await reloadWeather();
            }

        });

    });


/*************************************************
 * RECHARGER LA MÉTÉO APRÈS CHANGEMENT D'UNITÉ
 *************************************************/

async function reloadWeather() {

    if (!currentLocation) {
        return;
    }


    try {

        /*****************************************
         * AFFICHER LE LOADING
         *****************************************/

        showLoading();


        /*****************************************
         * RÉCUPÉRER LA MÉTÉO
         *****************************************/

        const weather =
            await getWeather(
                currentLocation.latitude,
                currentLocation.longitude
            );


        currentWeather =
            weather;


        /*****************************************
         * AFFICHER LA MÉTÉO ACTUELLE
         *****************************************/

        displayCurrentWeather(
            currentLocation,
            weather
        );


        /*****************************************
         * DAILY FORECAST
         *****************************************/

        displayDailyForecast(
            weather
        );


        /*****************************************
         * HOURLY FORECAST
         *****************************************/

        displayHourlyForecast(
            weather,
            0
        );


        /*****************************************
         * CACHER LE LOADING
         *****************************************/

        hideLoading();


        /*****************************************
         * CACHER L'ERREUR
         *****************************************/

        hideError();


    } catch (error) {

        console.error(
            "Weather reload error:",
            error
        );


        hideLoading();

        showError();

    }

}


/*************************************************
 * SWITCH METRIC / IMPERIAL
 *************************************************/

const switchUnitsButton =
    document.querySelector("#switch-units-btn");


switchUnitsButton.addEventListener(
    "click",
    async function () {

        /*****************************************
         * PASSER EN IMPERIAL
         *****************************************/

        if (currentUnits.temperature === "celsius") {

            currentUnits.temperature =
                "fahrenheit";

            currentUnits.windSpeed =
                "mph";

            currentUnits.precipitation =
                "inch";

            this.textContent =
                "Switch to Metric";

        }

        /*****************************************
         * PASSER EN METRIC
         *****************************************/

        else {

            currentUnits.temperature =
                "celsius";

            currentUnits.windSpeed =
                "kmh";

            currentUnits.precipitation =
                "mm";

            this.textContent =
                "Switch to Imperial";

        }


        console.log(
            "Unités actuelles :",
            currentUnits
        );


        /*****************************************
         * METTRE À JOUR LES CASES COCHÉES
         *****************************************/

        updateUnitSelection();


        /*****************************************
         * RECHARGER LA MÉTÉO
         *****************************************/

        if (currentLocation) {

            await reloadWeather();

        }

    }
);


/*************************************************
 * METTRE À JOUR LA SÉLECTION DES UNITÉS
 *************************************************/

function updateUnitSelection() {

    /*****************************************
     * TEMPÉRATURE
     *****************************************/

    document
        .querySelectorAll(
            '[data-type="temperature"]'
        )
        .forEach(option => {

            option.classList.remove(
                "selected"
            );

        });


    const selectedTemperature =
        document.querySelector(
            `[data-type="temperature"][data-value="${currentUnits.temperature}"]`
        );


    if (selectedTemperature) {

        selectedTemperature.classList.add(
            "selected"
        );

    }


    /*****************************************
     * VENT
     *****************************************/

    document
        .querySelectorAll(
            '[data-type="wind-speed"]'
        )
        .forEach(option => {

            option.classList.remove(
                "selected"
            );

        });


    const selectedWind =
        document.querySelector(
            `[data-type="wind-speed"][data-value="${currentUnits.windSpeed}"]`
        );


    if (selectedWind) {

        selectedWind.classList.add(
            "selected"
        );

    }


    /*****************************************
     * PRÉCIPITATIONS
     *****************************************/

    document
        .querySelectorAll(
            '[data-type="precipitation"]'
        )
        .forEach(option => {

            option.classList.remove(
                "selected"
            );

        });


    const selectedPrecipitation =
        document.querySelector(
            `[data-type="precipitation"][data-value="${currentUnits.precipitation}"]`
        );


    if (selectedPrecipitation) {

        selectedPrecipitation.classList.add(
            "selected"
        );

    }

}


/*************************************************
 * INITIALISATION DES UNITÉS
 *************************************************/

const defaultTemperature =
    document.querySelector(
        '.option[data-type="temperature"][data-value="celsius"]'
    );

const defaultWindSpeed =
    document.querySelector(
        '.option[data-type="wind-speed"][data-value="kmh"]'
    );

const defaultPrecipitation =
    document.querySelector(
        '.option[data-type="precipitation"][data-value="mm"]'
    );


if (defaultTemperature) {

    defaultTemperature.classList.add(
        "selected"
    );

}

if (defaultWindSpeed) {

    defaultWindSpeed.classList.add(
        "selected"
    );

}

if (defaultPrecipitation) {

    defaultPrecipitation.classList.add(
        "selected"
    );

}


switchUnitsButton.textContent =
    "Switch to Imperial";


/*************************************************
 * MENU HOURLY FORECAST
 *************************************************/

dayButton.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        dayButton.classList.toggle(
            "active"
        );

    }
);


/*************************************************
 * SÉLECTION D'UN JOUR
 *************************************************/

document
    .querySelectorAll(".switch-day")
    .forEach(day => {

        day.addEventListener(
            "click",
            function () {

                document
                    .querySelectorAll(
                        ".switch-day"
                    )
                    .forEach(day => {

                        day.classList.remove(
                            "selected"
                        );

                    });


                this.classList.add(
                    "selected"
                );


                const selectedDay =
                    this.textContent.trim();


                const dayIndex =
                    Number(
                        this.dataset.day
                    );


                document
                    .querySelector(
                        "#selected-day"
                    )
                    .textContent =
                    selectedDay;


                if (currentWeather) {

                    displayHourlyForecast(
                        currentWeather,
                        dayIndex
                    );

                }


                dayButton.classList.remove(
                    "active"
                );

            }
        );

    });


/*************************************************
 * JOUR PAR DÉFAUT
 *************************************************/

const firstDay =
    document.querySelector(
        '.switch-day[data-day="1"]'
    );


if (firstDay) {

    firstDay.classList.add(
        "selected"
    );

}


/*************************************************
 * FERMER LES MENUS EN CLIQUANT À L'EXTÉRIEUR
 *************************************************/

document.addEventListener(
    "click",
    function (event) {

        /*****************************************
         * MENU UNITS
         *****************************************/

        if (
            !event.target.closest(
                ".hautdepage .container"
            )
        ) {

            unitsButton.classList.remove(
                "active"
            );

        }


        /*****************************************
         * MENU JOURS
         *****************************************/

        if (
            !event.target.closest(
                ".hourly-header .container"
            )
        ) {

            dayButton.classList.remove(
                "active"
            );

        }


        /*****************************************
         * SUGGESTIONS
         *****************************************/

        if (
            !event.target.closest(
                ".search-input-container"
            )
        ) {

            suggestionsList.style.display =
                "none";

        }

    }
);


/*************************************************
 * API OPEN-METEO
 *************************************************/

const GEO_API_URL =
    "https://geocoding-api.open-meteo.com/v1/search";

const WEATHER_API_URL =
    "https://api.open-meteo.com/v1/forecast";


/*************************************************
 * RECHERCHE DE VILLE
 *************************************************/

searchButton.addEventListener(
    "click",
    async function () {

        const city =
            searchInput.value.trim();


        if (!city) {

            return;

        }


        suggestionsList.style.display =
            "none";


        suggestionsList.innerHTML =
            "";


        await loadWeather(city);

    }
);


/*************************************************
 * AFFICHER LES SUGGESTIONS
 *************************************************/

function displayCitySuggestions(cities) {

    suggestionsList.innerHTML =
        "";


    if (cities.length === 0) {

        suggestionsList.style.display =
            "none";

        return;

    }


    cities.forEach(city => {

        const suggestion =
            document.createElement(
                "li"
            );


        let text =
            city.name;


        if (city.admin1) {

            text +=
                `, ${city.admin1}`;

        }


        if (city.country) {

            text +=
                `, ${city.country}`;

        }


        suggestion.textContent =
            text;


        suggestion.addEventListener(
            "click",
            async function () {

                searchInput.value =
                    city.name;


                suggestionsList.style.display =
                    "none";


                await loadWeatherFromLocation(
                    city
                );

            }
        );


        suggestionsList.appendChild(
            suggestion
        );

    });


    suggestionsList.style.display =
        "block";

}


/*************************************************
 * CHARGER LA MÉTÉO D'UNE VILLE SÉLECTIONNÉE
 *************************************************/

async function loadWeatherFromLocation(
    location
) {

    try {

        console.log(
            "Selected city:",
            location.name
        );


        /*****************************************
         * AFFICHER LE LOADING
         *****************************************/

        showLoading();


        /*****************************************
         * SAUVEGARDER LA LOCALISATION
         *****************************************/

        currentLocation =
            location;


        /*****************************************
         * RÉCUPÉRER LA MÉTÉO
         *****************************************/

        const weather =
            await getWeather(
                location.latitude,
                location.longitude
            );


        currentWeather =
            weather;


        /*****************************************
         * AFFICHER LES DONNÉES
         *****************************************/

        displayCurrentWeather(
            location,
            weather
        );


        displayDailyForecast(
            weather
        );


        displayHourlyForecast(
            weather,
            0
        );


        /*****************************************
         * CACHER LE LOADING
         *****************************************/

        hideLoading();

        hideError();


    } catch (error) {

        console.error(
            "Weather loading error:",
            error
        );


        hideLoading();

        showError();

    }

}


/*************************************************
 * AUTOCOMPLÉTION DES VILLES
 *************************************************/

searchInput.addEventListener(
    "input",
    async function () {

        const city =
            this.value.trim();


        if (!city) {

            suggestionsList.innerHTML =
                "";

            suggestionsList.style.display =
                "none";

            return;

        }


        if (city.length < 2) {

            suggestionsList.style.display =
                "none";

            return;

        }


        try {

            const cities =
                await searchCities(
                    city
                );


            displayCitySuggestions(
                cities
            );

        } catch (error) {

            console.error(
                "City search error:",
                error
            );


            suggestionsList.style.display =
                "none";

        }

    }
);


/*************************************************
 * RÉCUPÉRER LA MÉTÉO
 *************************************************/

async function getWeather(
    latitude,
    longitude
) {

    const url =
        `${WEATHER_API_URL}?` +

        `latitude=${latitude}` +

        `&longitude=${longitude}` +

        `&current=` +
        `temperature_2m,` +
        `relative_humidity_2m,` +
        `apparent_temperature,` +
        `precipitation,` +
        `wind_speed_10m,` +
        `weather_code` +

        `&daily=` +
        `weather_code,` +
        `temperature_2m_max,` +
        `temperature_2m_min` +

        `&hourly=` +
        `temperature_2m,` +
        `weather_code,` +
        `precipitation,` +
        `wind_speed_10m` +

        `&temperature_unit=${currentUnits.temperature}` +

        `&wind_speed_unit=${currentUnits.windSpeed}` +

        `&precipitation_unit=${currentUnits.precipitation}` +

        `&timezone=auto` +

        `&forecast_days=7`;



    const response =
        await fetch(url);


    if (!response.ok) {

        throw new Error(
            "Weather API error"
        );

    }


    const data =
        await response.json();


    return data;

}


/*************************************************
 * AFFICHER LA MÉTÉO ACTUELLE
 *************************************************/

function displayCurrentWeather(
    location,
    weather
) {

    const current =
        weather.current;


    /*****************************************
     * CITY
     *****************************************/

    document
        .querySelector("#city-name")
        .textContent =
        `${location.name}, ${location.country}`;


    /*****************************************
     * DATE
     *****************************************/

    const currentDate =
        document.querySelector(
            "#current-date"
        );


    if (current.time) {

        const date =
            new Date(
                current.time
            );


        currentDate.textContent =
            date.toLocaleDateString(
                "en-US",
                {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                }
            );

    }


    /*****************************************
     * TEMPÉRATURE
     *****************************************/

    const temperatureUnit =
        currentUnits.temperature === "celsius"
            ? "°C"
            : "°F";


    document
        .querySelector("#temperature")
        .textContent =
        `${Math.round(
            current.temperature_2m
        )}${temperatureUnit}`;


    /*****************************************
     * ICÔNE
     *****************************************/

    const weatherIcon =
        document.querySelector(
            "#weather-icon"
        );


    weatherIcon.src =
        getWeatherIcon(
            current.weather_code
        );


    weatherIcon.alt =
        "Weather";


    /*****************************************
     * FEELS LIKE
     *****************************************/

    document
        .querySelector("#feels-like")
        .textContent =
        `${Math.round(
            current.apparent_temperature
        )}${temperatureUnit}`;


    /*****************************************
     * HUMIDITY
     *****************************************/

    document
        .querySelector("#humidity")
        .textContent =
        `${current.relative_humidity_2m}%`;


    /*****************************************
     * WIND
     *****************************************/

    const windUnit =
        currentUnits.windSpeed === "kmh"
            ? "km/h"
            : "mph";


    document
        .querySelector("#wind")
        .textContent =
        `${Math.round(
            current.wind_speed_10m
        )} ${windUnit}`;


    /*****************************************
     * PRECIPITATION
     *****************************************/

    const precipitationUnit =
        currentUnits.precipitation === "mm"
            ? "mm"
            : "in";


    document
        .querySelector("#precipitation")
        .textContent =
        `${current.precipitation} ${precipitationUnit}`;

}


/*************************************************
 * RECHERCHE DE VILLE
 *************************************************/

async function searchCities(city) {

    const url =
        `${GEO_API_URL}?` +
        `name=${encodeURIComponent(city)}` +
        `&count=4` +
        `&language=en` +
        `&format=json`;


    const response =
        await fetch(url);


    if (!response.ok) {

        throw new Error(
            "Geocoding API error"
        );

    }


    const data =
        await response.json();


    return data.results || [];

}


/*************************************************
 * RÉCUPÉRER UNE VILLE
 *************************************************/

async function getCityCoordinates(city) {

    const results =
        await searchCities(
            city
        );


    if (
        !results ||
        results.length === 0
    ) {

        throw new Error(
            "City not found"
        );

    }


    return results[0];

}


/*************************************************
 * WEATHER ICON
 *************************************************/

function getWeatherIcon(weatherCode) {

    /*****************************************
     * CLEAR SKY
     *****************************************/

    if (weatherCode === 0) {

        return "./images/icon-sunny.webp";

    }


    /*****************************************
     * MAINLY CLEAR / PARTLY CLOUDY
     *****************************************/

    if (
        weatherCode === 1 ||
        weatherCode === 2
    ) {

        return "./images/icon-partly-cloudy.webp";

    }


    /*****************************************
     * OVERCAST
     *****************************************/

    if (weatherCode === 3) {

        return "./images/icon-overcast.webp";

    }


    /*****************************************
     * FOG
     *****************************************/

    if (
        weatherCode === 45 ||
        weatherCode === 48
    ) {

        return "./images/icon-fog.webp";

    }


    /*****************************************
     * RAIN
     *****************************************/

    if (
        weatherCode >= 51 &&
        weatherCode <= 67
    ) {

        return "./images/icon-rain.webp";

    }


    /*****************************************
     * SNOW
     *****************************************/

    if (
        weatherCode >= 71 &&
        weatherCode <= 77
    ) {

        return "./images/icon-snow.webp";

    }


    /*****************************************
     * RAIN SHOWERS
     *****************************************/

    if (
        weatherCode >= 80 &&
        weatherCode <= 82
    ) {

        return "./images/icon-rain.webp";

    }


    /*****************************************
     * THUNDERSTORM
     *****************************************/

    if (weatherCode >= 95) {

        return "./images/icon-storm.webp";

    }


    /*****************************************
     * DEFAULT
     *****************************************/

    return "./images/icon-sunny.webp";

}


/*************************************************
 * DAILY FORECAST
 *************************************************/

function displayDailyForecast(weather) {

    const daily =
        weather.daily;


    const forecastContainer =
        document.querySelector(
            "#forecast-container"
        );


    forecastContainer.innerHTML =
        "";


    const temperatureUnit =
        currentUnits.temperature === "celsius"
            ? "°C"
            : "°F";


    /*****************************************
     * CRÉER LES 7 JOURS
     *****************************************/

    for (
        let i = 0;
        i < daily.time.length;
        i++
    ) {

        const date =
            new Date(
                daily.time[i]
            );


        const dayName =
            date.toLocaleDateString(
                "en-US",
                {
                    weekday: "short"
                }
            );


        const maxTemperature =
            Math.round(
                daily.temperature_2m_max[i]
            );


        const minTemperature =
            Math.round(
                daily.temperature_2m_min[i]
            );


        const weatherCode =
            daily.weather_code[i];


        const forecastDay =
            document.createElement(
                "div"
            );


        forecastDay.classList.add(
            "forecast-day"
        );


        forecastDay.innerHTML = `

            <h3>${dayName}</h3>

            <img
                src="${getWeatherIcon(weatherCode)}"
                alt="Weather"
            >

            <div class="forecast-temperatures">

                <span class="max-temperature">
                    ${maxTemperature}${temperatureUnit}
                </span>

                <span class="min-temperature">
                    ${minTemperature}${temperatureUnit}
                </span>

            </div>

        `;


        forecastContainer.appendChild(
            forecastDay
        );

    }

}


/*************************************************
 * CHARGER LA MÉTÉO
 *************************************************/

async function loadWeather(city) {

    try {

        console.log(
            "Loading weather for:",
            city
        );


        /*****************************************
         * AFFICHER LE LOADING
         *****************************************/

        showLoading();


        /*****************************************
         * RECHERCHER LA VILLE
         *****************************************/

        const location =
            await getCityCoordinates(
                city
            );


        currentLocation =
            location;


        /*****************************************
         * RÉCUPÉRER LA MÉTÉO
         *****************************************/

        const weather =
            await getWeather(
                location.latitude,
                location.longitude
            );


        currentWeather =
            weather;


        /*****************************************
         * AFFICHER LES DONNÉES
         *****************************************/

        displayCurrentWeather(
            location,
            weather
        );


        displayDailyForecast(
            weather
        );


        displayHourlyForecast(
            weather,
            0
        );


        /*****************************************
         * CACHER LE LOADING
         *****************************************/

        hideLoading();


        hideError();


    } catch (error) {

        console.error(
            "Weather loading error:",
            error
        );


        hideLoading();

        showError();

    }

}


/*************************************************
 * MÉTÉO PAR DÉFAUT
 *************************************************/

loadWeather(
    "Berlin"
);


/*************************************************
 * HOURLY FORECAST
 *************************************************/

function displayHourlyForecast(
    weather,
    dayIndex = 0
) {

    const hourly =
        weather.hourly;


    const hourlyContainer =
        document.querySelector(
            "#hourly-container"
        );


    hourlyContainer.innerHTML =
        "";


    const temperatureUnit =
        currentUnits.temperature === "celsius"
            ? "°C"
            : "°F";


    const selectedDate =
        weather.daily.time[dayIndex];


    /*****************************************
     * PARCOURIR LES HEURES
     *****************************************/

    for (
        let i = 0;
        i < hourly.time.length;
        i++
    ) {

        const dateTime =
            hourly.time[i];


        if (
            !dateTime.startsWith(
                selectedDate
            )
        ) {

            continue;

        }


        const temperature =
            Math.round(
                hourly.temperature_2m[i]
            );


        const weatherCode =
            hourly.weather_code[i];


        const date =
            new Date(
                dateTime
            );


        const hour =
            date.toLocaleTimeString(
                "en-US",
                {
                    hour: "numeric",
                    hour12: true
                }
            );


        const hourlyItem =
            document.createElement(
                "div"
            );


        hourlyItem.classList.add(
            "hourly-item"
        );


        hourlyItem.innerHTML = `

            <span class="hourly-time">
                ${hour}
            </span>

            <img
                src="${getWeatherIcon(weatherCode)}"
                alt="Weather"
                class="hourly-icon"
            >

            <span class="hourly-temperature">
                ${temperature}${temperatureUnit}
            </span>

        `;


        hourlyContainer.appendChild(
            hourlyItem
        );

    }

}


/*************************************************
 * LOADING
 *************************************************/

function showLoading() {

    console.log(
        "SHOW LOADING"
    );


    weatherApp.style.display =
        "block";



    errorMessage.style.display =
        "none";


    if (currentWeatherInfo) {

        currentWeatherInfo.style.display =
            "none";

    }


    if (currentTemperature) {

        currentTemperature.style.display =
            "none";

    }


    if (currentLoading) {

        currentLoading.style.display =
            "flex";

    }



    resetWeatherDetails();



    createDailyLoading();


    createHourlyLoading();

}


/*************************************************
 * CACHER LE LOADING
 *************************************************/

function hideLoading() {

    console.log(
        "HIDE LOADING"
    );


    if (currentLoading) {

        currentLoading.style.display =
            "none";

    }



    if (currentWeatherInfo) {

        currentWeatherInfo.style.display =
            "";

    }


    if (currentTemperature) {

        currentTemperature.style.display =
            "";

    }



    weatherApp.style.display =
        "block";

}


function resetWeatherDetails() {

    const feelsLike =
        document.querySelector(
            "#feels-like"
        );

    const humidity =
        document.querySelector(
            "#humidity"
        );

    const wind =
        document.querySelector(
            "#wind"
        );

    const precipitation =
        document.querySelector(
            "#precipitation"
        );


    if (feelsLike) {

        feelsLike.textContent =
            "-";

    }


    if (humidity) {

        humidity.textContent =
            "-";

    }


    if (wind) {

        wind.textContent =
            "-";

    }


    if (precipitation) {

        precipitation.textContent =
            "-";

    }

}


/*************************************************
 * LOADING DAILY FORECAST
 *************************************************/

function createDailyLoading() {

    const forecastContainer =
        document.querySelector(
            "#forecast-container"
        );


    if (!forecastContainer) {
        return;
    }


    forecastContainer.innerHTML =
        "";


    for (
        let i = 0;
        i < 7;
        i++
    ) {

        const skeleton =
            document.createElement(
                "div"
            );


        skeleton.classList.add(
            "forecast-day",
            "loading-skeleton"
        );


        skeleton.innerHTML = `

            <div class="skeleton-line skeleton-day"></div>

            <div class="skeleton-icon"></div>

            <div class="skeleton-temperatures">

                <div class="skeleton-small"></div>

                <div class="skeleton-small"></div>

            </div>

        `;


        forecastContainer.appendChild(
            skeleton
        );

    }

}


/*************************************************
 * LOADING HOURLY FORECAST
 *************************************************/

function createHourlyLoading() {

    const hourlyContainer =
        document.querySelector(
            "#hourly-container"
        );


    if (!hourlyContainer) {
        return;
    }


    hourlyContainer.innerHTML =
        "";

    for (
        let i = 0;
        i < 8;
        i++
    ) {

        const skeleton =
            document.createElement(
                "div"
            );


        skeleton.classList.add(
            "hourly-item",
            "hourly-loading-skeleton"
        );


        skeleton.innerHTML = `

            <div class="skeleton-line skeleton-hour"></div>

            <div class="skeleton-hour-icon"></div>

            <div class="skeleton-line skeleton-temperature"></div>

        `;


        hourlyContainer.appendChild(
            skeleton
        );

    }

}


/*************************************************
 * GESTION DES ERREURS
 *************************************************/

function showError() {

    /*****************************************
     * CACHER LE LOADING
     *****************************************/

    if (currentLoading) {

        currentLoading.style.display =
            "none";

    }


    /*****************************************
     * CACHER WEATHER APP
     *****************************************/

    weatherApp.style.display =
        "none";


    /*****************************************
     * AFFICHER L'ERREUR
     *****************************************/

    errorMessage.style.display =
        "flex";

}


/*************************************************
 * CACHER L'ERREUR
 *************************************************/

function hideError() {

    errorMessage.style.display =
        "none";

}


/*************************************************
 * RETRY
 *************************************************/

retryButton.addEventListener(
    "click",
    async function () {

        if (currentLocation) {

            await reloadWeather();

        }

        else {

            await loadWeather(
                "Berlin"
            );

        }

    }
);
