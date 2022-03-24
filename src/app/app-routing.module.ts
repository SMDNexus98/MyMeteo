import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from 'src/pages/homepage/homepage.component';
import { WeatherCityComponent } from 'src/pages/weather-city/weather-city.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'weather-city', component: WeatherCityComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
