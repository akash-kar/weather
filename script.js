const apiKey = '894d045a78d65d055575ac0f21b464ce';

/*document.getElementById('search-button').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    getWeather(city);
});*/
// ...

// Add event listener for the "Search" button to fetch both current weather and forecast
document.getElementById('search-button').addEventListener('click', async () => {
    const city = document.getElementById('city-input').value;
    await getWeather(city); // Wait for current weather data
    getForecast(city);
});

// ...


async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
        } else {
            swal('City not found');
        }
    } catch (error) {
        showError('An error occurred');
    }
}

function displayWeather(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('temperature').textContent = `${data.main.temp}°C`;
    document.getElementById('description').textContent = data.weather[0].description;
    const humidityElement = document.getElementById('humidity');
    const humidity = data.main.humidity;
    humidityElement.textContent = `Humidity: ${humidity}%`;

    document.querySelector('.weather-info').style.display = 'block';
}

function showError(message) {
    document.querySelector('.weather-info').style.display = 'none';
    alert(message);
}
// Add this code after the existing JavaScript code

// Function to fetch 5-day weather forecast
async function getForecast(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === '200') {
            displayForecast(data.list);
        }
    } catch (error) {
        showError('An error occurred');
    }
}

// Function to display 5-day forecast
/*function displayForecast(forecastList) {
    const forecastContainer = document.getElementById('forecast-list');
    forecastContainer.innerHTML = ''; // Clear previous forecast data

    forecastList.slice(0, 5).forEach((forecastItem) => {
        const timestamp = forecastItem.dt * 1000; // Convert timestamp to milliseconds
        const date = new Date(timestamp);
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });

        const forecastDiv = document.createElement('div');
        forecastDiv.classList.add('forecast-item');
        forecastDiv.innerHTML = `
            <div>${dayOfWeek}</div>
            <div>${forecastItem.main.temp.toFixed(1)}°C</div>
            <div>${forecastItem.weather[0].description}</div>
        `;

        forecastContainer.appendChild(forecastDiv);
    });
}*/
function displayForecast(forecastList) {
    const forecastContainer = document.getElementById('forecast-list');
    forecastContainer.innerHTML = ''; // Clear previous forecast data

    const uniqueDates = {};

    forecastList.forEach((forecastItem) => {
        const timestamp = forecastItem.dt * 1000; // Convert timestamp to milliseconds
        const date = new Date(timestamp);
        const dateString = date.toLocaleDateString('en-US', { weekday: 'short' });

        if (!uniqueDates[dateString]) {
            uniqueDates[dateString] = true;

            const forecastDiv = document.createElement('div');
            forecastDiv.classList.add('forecast-item');
            forecastDiv.innerHTML = `
                <div>${dateString}</div>
                <div>${forecastItem.main.temp.toFixed(1)}°C</div>
                <div>${forecastItem.weather[0].description}</div>
            `;

            forecastContainer.appendChild(forecastDiv);
        }
    });
}


// Add event listener for the "Search" button to fetch both current weather and forecast
document.getElementById('search-button').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    getWeather(city);
    getForecast(city);
});

