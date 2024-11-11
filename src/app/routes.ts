import {Routes} from '@angular/router';
import {WeatherComponent} from './weather/weather.component';
import {DetailsComponent} from './details/details.component';

const routeConfig: Routes = [
    {
      path: '',
      component: WeatherComponent,
      title: 'City page',
    },
    {
      path: 'details/:id',
      component: DetailsComponent,
      title: 'Weather details',
    },
  ];
  export default routeConfig;