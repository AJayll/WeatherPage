import { Component } from '@angular/core';
import {WeatherLocationComponent} from '../weather-location/weather-location.component';
import {WeatherLocation} from '../weather-location';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [WeatherLocationComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  weatherLocation: WeatherLocation = {
    id: 9999,
    temperature: 75,
    city: 'Tampa',
    state: 'FL',
    forecast: "Sunny",
    details: "Humidity 84%, Wind: 8mph NE",
    celsius: false,
  };
}
