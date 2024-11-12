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

export class WeatherComponent { //Mix of tutorial declarations and declarations to help process API in filter Results function
  
  weatherLocationList: WeatherLocation[] = []; //These are lists from the tutorial, given more time TODO: fix
  filteredLocationList: WeatherLocation[] = [];
  
  cityResult: {city: string, state: string, locationKey: string} | null = null;

  errorMessage: string | null = null;  // Solely to update the front-end user
  useCelsius: boolean = false; // Default read is Farenheit
  weatherService: WeatherService = inject(WeatherService);

  constructor() {
    this.weatherLocationList = this.weatherService.getAllWeatherLocations();
    this.filteredLocationList = this.weatherLocationList;
  }

  // Temperature control Helpers
  convertToCelsius(fahrenheit: number): number {
    return Math.round(((fahrenheit - 32) * 5) / 9); // Accepting rounding error since temperature range is volatile anyway
  }

  convertToFahrenheit(celsius: number): number {
    return Math.round((celsius * 9) / 5 + 32); // Accepting rounding error (Can gain/lose a degree after multiple toggles)
  }
  
  // Actual Temperature function called when button is toggled 
  toggleTemperatureUnit() {
    if (this.filteredLocationList.length == 0){
      console.log("No Locations to change temp");
      return;
    }
    this.useCelsius = !this.useCelsius;
    var weather: WeatherLocation = this.filteredLocationList[0]; // Artifact of tutorial using lists
    if (this.useCelsius) { // Check if the update is to Celsius vs to Farenheit
      weather.temperature = this.convertToCelsius(weather.temperature);
      weather.details = `${weather.details.slice(0,1)}C${weather.details.slice(2)}` // Swap the unit of the temp
    } else {
      weather.temperature = this.convertToFahrenheit(weather.temperature);
      weather.details = `${weather.details.slice(0,1)}F${weather.details.slice(2)}` // Swap the unit of the temp
    }
  }

  filterResults(city: string) { // Since we are only taking the first result, want it to be more accurate search
    this.errorMessage = null; // Clear previous error if any
    if (!city) { 
      this.filteredLocationList = this.weatherLocationList; // If the city is empty; return, usually []
      this.errorMessage = "City search field empty";
      return;
    }
    this.weatherService.searchCityForecast(city).subscribe((response: any[]) => { 
      const filteredResults = response.filter(location => 
        location.LocalizedName.toLowerCase() === city.toLowerCase());
      if (filteredResults.length > 0){ // Only want the first city returned by API as per doc requirements
        this.cityResult = {
          city: filteredResults[0].LocalizedName,
          state: filteredResults[0].AdministrativeArea.LocalizedName,
          locationKey: filteredResults[0].Key
        }
      } else {
        this.errorMessage = "City not found or Invalid City name";
        this.filteredLocationList = [];
        return;
      }
      // Using the locationKey from the city query, get all the details of the weather now
      this.weatherService.getForecast(this.cityResult.locationKey).subscribe((forecastResponse: any) => {
        // Mapping the API response to the WeatherLocation component using safe indexing
        const dailyForecast = forecastResponse?.DailyForecasts?.[0];
        const dayDetails = dailyForecast?.Day;

        if (dailyForecast && dayDetails) { // Check the api returned the bare minimum data
          this.filteredLocationList = [{
            id: 1,
            temperature: (dailyForecast.Temperature.Maximum.Value + dailyForecast.Temperature.Minimum.Value) / 2,
            forecast: dayDetails.IconPhrase,
            city: filteredResults[0].LocalizedName,
            state: filteredResults[0].AdministrativeArea.LocalizedName,
            details: `${this.useCelsius ? '°C' : '°F'}, Humidity: ${dayDetails.RelativeHumidity?.Average ?? 'N/A'}%, 
              Wind: ${dayDetails.Wind?.Speed?.Value ?? 'N/A'} ${dayDetails.Wind?.Speed?.Unit ?? 'mi/h'}`,
            celsius: this.useCelsius,
            locationKey: filteredResults[0].Key
          }];
        } else {
          this.errorMessage = "Massively incomplete forecast data, Sorry!";
          this.filteredLocationList = [];
        }
      }, (error) => { 
          this.errorMessage = "Error fetching data for the city";
          this.filteredLocationList = []; //Clear previous result
        }
      );
    }
  );
}

  getForecast(locationKey: string) {
    this.weatherService.getForecast(locationKey).subscribe((forecastData: any) => {
      console.log(forecastData);
      // Use forecast data here or display it in the component
    });
  }
}
