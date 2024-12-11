import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

router.post('/', async (req: Request, res: Response) => {
  try {
    const { cityName } = req.body;

    if (!cityName) {
      return res.status(400).json({ error: 'City name is required' });
    }

    const weatherData = await WeatherService.fetchWeatherByCity(cityName);
    await HistoryService.saveCity(cityName);

    res.json(weatherData);
  } catch (error) {
    console.error('Error in POST /api/weather:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

router.get('/history', async (_req: Request, res: Response) => {
  try {
    const history = await HistoryService.retrieveCities();
    res.json(history);
  } catch (err) {
    console.error('Error in GET /api/weather/history:', err);
    res.status(500).json(err);
  }
});

// BONUS
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    const cityId = req.params.id;

    if (!cityId) {
      return res.status(400).json({ error: 'City ID is required' });
    }

    await HistoryService.deleteCity(cityId);
    res.json({ success: 'City removed from history' });
  } catch (error) {
    console.error('Error in DELETE /api/weather/history/:id:', error);
    res.status(500).json(error);
  }
});

export default router;