import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { CityGuard } from '../guards/city.guard';
import { HomepageComponent } from '../pages/homepage/homepage.component';
import { WeatherCityComponent } from '../pages/weather-city/weather-city.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'weather-city', component: WeatherCityComponent, canActivate: [CityGuard] },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
