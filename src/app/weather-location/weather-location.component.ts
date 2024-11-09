import { Component, Input } from '@angular/core';
import {WeatherLocation} from '../weather-location';

@Component({
  selector: 'app-weather-location',
  standalone: true,
  imports: [],
  templateUrl: './weather-location.component.html',
  styleUrl: './weather-location.component.css'
})
export class WeatherLocationComponent {
  @Input() weatherLocation!: WeatherLocation; //from angular tutorial
}
