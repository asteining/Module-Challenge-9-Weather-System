import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs/promises';

interface City {
  id: string;
  cityName: string;
}

const FILE_PATH = './data/searchHistory.json';

const HistoryService = {
  async getHistory(): Promise<City[]> {
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    return JSON.parse(data) as City[];
  },

  async addCity(cityName: string): Promise<City> {
    const history = await this.getHistory();
    const newCity: City = { id: uuidv4(), cityName };
    history.push(newCity);
    await fs.writeFile(FILE_PATH, JSON.stringify(history, null, 2));
    return newCity;
  },

  async deleteCity(id: string): Promise<string | null> {
    const history = await this.getHistory();
    const updatedHistory = history.filter((city) => city.id !== id);
    if (history.length === updatedHistory.length) return null;

    await fs.writeFile(FILE_PATH, JSON.stringify(updatedHistory, null, 2));
    return id;
  },
};

export default HistoryService;