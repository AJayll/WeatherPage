import { Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';

const routeConfig: Routes = [
    {
      path: '',
      component: WeatherComponent,
      title: 'City page',
    },
  ];
  export default routeConfig;