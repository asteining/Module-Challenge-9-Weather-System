import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.post('/', async (req, res) => {
  const { cityName } = req.body;
  const API_KEY = process.env.API_KEY;
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

  if (!cityName) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    // Get coordinates for the city
    const geoResponse = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
    );

    if (!geoResponse.data.length) {
      return res.status(404).json({ error: 'City not found' });
    }

    const { lat, lon } = geoResponse.data[0];

    // Get weather data
    const weatherResponse = await axios.get(
      `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
    );

    res.json(weatherResponse.data);
  } catch (error) {
    const errorMessage = (error as any).message;
    console.error('Error fetching weather data:', errorMessage);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

export default router;
