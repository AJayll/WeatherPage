import { Injectable } from '@angular/core';
import {WeatherLocation} from './weather-location';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weatherLocationList: WeatherLocation[] = [{ //temp static data for tutorial
      id: 0,
      temperature: 75,
      city: 'Tampa',
      state: 'FL',
      forecast: "Sunny",
      details: "Humidity 84%, Wind: 8mph NE",
      celsius: false,
    },
    {
      id: 1,
      temperature: 78,
      city: 'Weston',
      state: 'FL',
      forecast: "Cloudy",
      details: "Humidity 86%, Wind: 4mph NE",
      celsius: false,
    },
    {
      id: 2,
      temperature: 78,
      city: 'Davie',
      state: 'FL',
      forecast: "Cloudy",
      details: "Humidity 86%, Wind: 4mph NE",
      celsius: false,
    },
    {
      id: 3,
      temperature: 72,
      city: 'Naples',
      state: 'FL',
      forecast: "Rainy",
      details: "Humidity 88%, Wind: 6mph NW",
      celsius: false,
    },
  ];
  constructor() { }
  getAllWeatherLocations(): WeatherLocation[] { // 2 getter functions proivided by tutorial
    return this.weatherLocationList;
  }
  getWeatherLocationById(id: number): WeatherLocation | undefined {
    return this.weatherLocationList.find((weatherLocation) => weatherLocation.id === id);
  }

}
