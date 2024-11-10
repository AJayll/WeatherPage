import { Component, inject } from '@angular/core';
import {WeatherLocationComponent} from '../weather-location/weather-location.component';
import { CommonModule } from '@angular/common';
import {WeatherLocation} from '../weather-location';
import {WeatherService} from '../weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, WeatherLocationComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  //Temp data, eventually pull cities (city?) from API with input being from the search bar
  weatherLocationList: WeatherLocation[] = [];
  weatherService: WeatherService = inject(WeatherService);
  constructor() {
    this.weatherLocationList = this.weatherService.getAllWeatherLocations();
  }
}
