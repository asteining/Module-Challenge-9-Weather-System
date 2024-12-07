import './styles/jass.css';

async function fetchWeather(cityName: string) {
  try {
    const response = await fetch('/api/weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cityName }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Weather Data:', data);
    displayWeather(data);
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
