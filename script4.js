// Select DOM elements
const inputBox = document.querySelector('.input-box'); // Input box for city name
const searchBtn = document.getElementById('searchBtn'); // Search button
const checkWeatherText = document.querySelector('.check-weather'); // "Check Weather" text
const weather_img = document.querySelector('.weather-img'); // Weather image
const temperature = document.querySelector('.temperature'); // Temperature display
const description = document.querySelector('.description'); // Weather description
const humidity = document.getElementById('humidity'); // Humidity display
const wind_speed = document.getElementById('wind-speed'); // Wind speed display
const location_not_found = document.querySelector('.location-not-found'); // Location not found message
const weather_body = document.querySelector('.weather-body'); // Weather info container

// Function to fetch and display weather data
async function checkWeather(city) {
    const api_key = "556fb1ac3653b37813f061436c9b9f49"; // Your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        // Hide the "Location not found" message/image before fetching new data
        location_not_found.style.display = "none";

        const response = await fetch(url);
        const weather_data = await response.json();

        if (weather_data.cod === '404') {
            location_not_found.style.display = "flex"; // Show location not found message
            weather_body.style.display = "none"; // Hide weather info
            console.log("Location not found");
            return;
        }

        console.log("Weather data found");
        checkWeatherText.style.display = "none"; // Hide "Check Weather" text
        weather_body.style.display = "flex"; // Show weather info

        // Update weather info
        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

        // Update weather image based on weather condition
        switch (weather_data.weather[0].main) {
            case 'Clouds':
                weather_img.src = "images/cloud.png";
                break;
            case 'Clear':
                weather_img.src = "images/clear.png";
                break;
            case 'Rain':
                weather_img.src = "images/rain.png";
                break;
            case 'Mist':
                weather_img.src = "images/mist.png";
                break;
            case 'Snow':
                weather_img.src = "images/snow.png";
                break;
        }

        console.log(weather_data); // Log weather data for debugging
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Add click event listener to search button
searchBtn.addEventListener('click', () => {
    const city = inputBox.value;
    checkWeather(city);
});
