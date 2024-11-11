import { Component, Input } from '@angular/core';
import {WeatherLocation} from '../weather-location';
import {RouterModule} from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-weather-location',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './weather-location.component.html',
  styleUrl: './weather-location.component.css'
})
export class WeatherLocationComponent {
  @Input() weatherLocation!: WeatherLocation; //from angular tutorial
}
