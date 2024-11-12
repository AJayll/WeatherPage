export interface WeatherLocation {
    id: number;
    temperature: number; // Defaults Farenheit
    forecast: string; // Sunny, cloudy, rainy etc.
    city: string;
    state: string;
    details: string; //Extra weather info i.e: humidity, wind direction/speed etc 
    celsius: boolean; 
    locationKey: string; // For API
}
