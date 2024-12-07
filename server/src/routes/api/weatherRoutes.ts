import { Router } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();

// POST Request: Retrieve weather data and save city to search history
router.post('/', async (req, res) => {
  try {
    const { cityName } = req.body;
    if (!cityName) {
      return res.status(400).json({ error: 'City name is required' });
    }

    const weatherData = await WeatherService.getWeatherData(cityName);
    const savedCity = await HistoryService.addCity(cityName);

    return res.status(200).json({ weather: weatherData, savedCity });
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching weather data' });
  }
});


// GET Request: Fetch search history
router.get('/history', async (_req, res) => {
  try {
    const history = await HistoryService.getHistory();
    return res.status(200).json(history);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching search history' });
  }
});


// DELETE Request: Delete a city from search history by ID
router.delete('/history/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCity = await HistoryService.deleteCity(id);

    if (!deletedCity) {
      return res.status(404).json({ error: 'City not found' });
    }

    return res.status(200).json({ message: 'City deleted successfully', deletedCity });
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting city' });
  }
});

export default router;
