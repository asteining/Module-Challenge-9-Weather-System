
import './styles/jass.css';

async function fetchWeather(cityName: string) {
  try {
    console.log('Sending request to /api/weather with cityName:', cityName);

    const response = await fetch('/api/weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cityName }),
    });

    console.log('Response status:', response.status);
    console.log('Response status text:', response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response body:', errorText);
      throw new Error(`Error: ${response.statusText}`);
    }
    
    function displayForecast(data: any) {
      const forecastContainer = document.getElementById('forecast');
      if (forecastContainer) {
        forecastContainer.innerHTML = ''; // Clear previous forecast
        data.list.slice(1, 6).forEach((forecast: any) => {
          const forecastElement = document.createElement('div');
          forecastElement.className = 'forecast-item';
          forecastElement.innerHTML = `
            <p>Date: ${new Date(forecast.dt * 1000).toLocaleDateString()}</p>
            <p>Temperature: ${forecast.main.temp} °F</p>
            <p>Wind: ${forecast.wind.speed} MPH</p>
            <p>Humidity: ${forecast.main.humidity}%</p>
          `;
          forecastContainer.appendChild(forecastElement);
        });
      }
    }

    const data = await response.json();
    console.log('Weather Data:', data);
    displayWeather(data);
    displayForecast(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    alert('Failed to fetch weather data. Please try again.');
  }
}

function displayWeather(data: any) {
  const searchTitle = document.getElementById('search-title');
  const temp = document.getElementById('temp');
  const wind = document.getElementById('wind');
  const humidity = document.getElementById('humidity');

  if (searchTitle && temp && wind && humidity) {
    searchTitle.textContent = `Weather in ${data.city.name}`;
    temp.textContent = `Temperature: ${data.list[0].main.temp} °F`;
    wind.textContent = `Wind: ${data.list[0].wind.speed} MPH`;
    humidity.textContent = `Humidity: ${data.list[0].main.humidity}%`;
  }
}

document.getElementById('search-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const cityName = (document.getElementById('search-input') as HTMLInputElement).value.trim();
  if (!cityName) {
    alert('Please enter a city name');
    return;
  }
  fetchWeather(cityName);
});
