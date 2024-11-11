import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {WeatherService} from '../weather.service';
import {WeatherLocation} from '../weather-location';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  weatherService = inject(WeatherService);
  weatherLocation: WeatherLocation | undefined;
  constructor() {
    const weatherLocationId = Number(this.route.snapshot.params['id']);
    this.weatherLocation = this.weatherService.getWeatherLocationById(weatherLocationId);
  }
}
