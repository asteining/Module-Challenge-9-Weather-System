import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';


class City {
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}

class HistoryService {
  private historyFile = 'db/db.json';

  private async readFile() {
    return await fs.readFile(this.historyFile, { flag: 'a+', encoding: 'utf8' });
  }

  private async writeFile(cities: City[]) {
    return await fs.writeFile(this.historyFile, JSON.stringify(cities, null, 2));
  }

  async retrieveCities() {
    return await this.readFile().then((data) => {
      try {
        return JSON.parse(data) as City[];
      } catch {
        return [];
      }
    });
  }

  async saveCity(cityName: string) {
    if (!cityName) {
      throw new Error('City name cannot be empty');
    }

    const newCity = new City(cityName, uuidv4());

    return await this.retrieveCities()
      .then((cities) => {
        if (cities.some((city) => city.name === cityName)) {
          return cities;
        }
        return [...cities, newCity];
      })
      .then((updatedCities) => this.writeFile(updatedCities))
      .then(() => newCity);
  }

  async deleteCity(id: string) {
    return await this.retrieveCities()
      .then((cities) => cities.filter((city) => city.id !== id))
      .then((updatedCities) => this.writeFile(updatedCities));
  }
}

export default new HistoryService();