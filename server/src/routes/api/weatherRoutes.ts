import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.post('/', async (req, res) => {
  const { cityName } = req.body;
  const API_KEY = '1cd2af220e5d9223c4afa6be38616ba4';

  console.log('Received request for city:', cityName);
  console.log('Using API Key:', API_KEY);

  if (!API_KEY) {
    console.error('API key is missing in environment variables.');
    return res.status(500).json({ error: 'API key is missing. Check your .env file.' });
  }

  if (!cityName) {
    console.error('City name is missing in the request.');
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    // Step 1: Get coordinates for the city
    console.log('Fetching coordinates...');
    const geoResponse = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
    );
    console.log('Geo Response:', geoResponse.data);

    if (!geoResponse.data.length) {
      console.error('City not found.');
      return res.status(404).json({ error: 'City not found' });
    }

    const { lat, lon } = geoResponse.data[0];
    console.log(`Coordinates: lat=${lat}, lon=${lon}`);

    // Step 2: Get weather data
    console.log('Fetching weather data...');
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
    );
    console.log('Weather Response:', weatherResponse.data);

    res.status(200).json(weatherResponse.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.status, error.response?.data);
    } else {
      const err = error as Error;
      console.error('General Error:', err.message);
    }
    res.status(500).json({ error: 'Failed to fetch weather data', details: (error as Error).message });
  }
});

export default router;
