import axios from 'axios';
const API_KEY = '1cd2af220e5d9223c4afa6be38616ba4'; // API key from .env file
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_KEY}';

const WeatherService = {
  async getWeatherData(cityName: string): Promise<any> {
    try {
      const geoResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_KEY}`);
      if (!geoResponse.data.length) {
        throw new Error('City not found');
      }

      const { lat, lon } = geoResponse.data[0];
      const weatherResponse = await axios.get(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      return weatherResponse.data;
    } catch (error) {
      throw new Error('Error fetching weather data');
    }
  },
};

export default WeatherService;
