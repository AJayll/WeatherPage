import { Component } from '@angular/core';
import {WeatherLocationComponent} from '../weather-location/weather-location.component';
import { CommonModule } from '@angular/common';
import {WeatherLocation} from '../weather-location';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, WeatherLocationComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  //Temp data, eventually pull cities (city?) from API with input being from the search bar
  weatherLocationList: WeatherLocation[] = [{
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
}
