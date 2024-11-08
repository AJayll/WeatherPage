import { Component } from '@angular/core';
import {WeatherLocationComponent} from '../weather-location/weather-location.component';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [WeatherLocationComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {

}
