import { Injectable } from '@angular/core';
import {WeatherLocation} from './weather-location';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "../environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = "https://dataservice.accuweather.com";

  //params = HttpParams().set('apikey', environment.accuweatherApiKey)

  weatherLocationList: WeatherLocation[] = [];
  constructor(private http: HttpClient) {}

  searchCityForecast(city: string): Observable<any> {
    const params = new HttpParams().set('apikey', environment.accuweatherApiKey).set('q', city); //query for a city and its forecast

    return this.http.get(`${this.apiUrl}/locations/v1/cities/search`, { params }); //to be used in getForecast, if empty or some error tell the user
  }

  getForecast(locationKey: string): Observable<any> {
    const params = new HttpParams().set('apikey', environment.accuweatherApiKey); //grab the forecast from the queried city
    return this.http.get(`${this.apiUrl}/forecasts/v1/daily/1day/${locationKey}`, { params });
  }

  getAllWeatherLocations(): WeatherLocation[] { // 2 getter functions proivided by tutorial
    return this.weatherLocationList;
  }
  getWeatherLocationById(id: number): WeatherLocation | undefined {
    return this.weatherLocationList.find((weatherLocation) => weatherLocation.id === id);
  }

}
