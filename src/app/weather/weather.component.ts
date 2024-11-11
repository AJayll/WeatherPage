import { Component, inject } from '@angular/core';
import { WeatherLocationComponent } from '../weather-location/weather-location.component';
import { CommonModule } from '@angular/common';
import { WeatherLocation } from '../weather-location';
import { WeatherService } from '../weather.service';

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
  filteredLocationList: WeatherLocation[] = [];
  weatherService: WeatherService = inject(WeatherService);
  constructor() {
    this.weatherLocationList = this.weatherService.getAllWeatherLocations();
    this.filteredLocationList = this.weatherLocationList;
  }

  filterResults(city: string) { //tutorial search function
    if (!city) { //If empty go back to original data, not very applicable in final product
      this.filteredLocationList = this.weatherLocationList;
      return;
    }
    this.weatherService.searchCityForecast(city).subscribe((response: any) => {
      this.filteredLocationList = response.map((location: any) => ({
        city: location.LocalizedName,
        state: location.AdministrativeArea.LocalizedName,
        locationKey: location.Key
      }));
    });
  }
  //   this.filteredLocationList = this.weatherLocationList.filter((weatherLocation) =>
  //     weatherLocation?.city.toLowerCase().includes(text.toLowerCase()),
  //   );
  // }
  getForecast(locationKey: string) {
    this.weatherService.getForecast(locationKey).subscribe((forecastData: any) => {
      console.log(forecastData);
      // Use forecast data here or display it in the component
    });
  }
}
