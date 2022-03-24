import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from '../pages/homepage/homepage.component';
import { CityCardComponent } from '../pages/homepage/components/city-card/city-card.component';
import { CelsiusPipe } from '../pipes/to-celsius.pipe';
import { BackgroundWeather } from '../directives/background-weather.directive';
import { WeatherCityComponent } from '../pages/weather-city/weather-city.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CityCardComponent,
    CelsiusPipe,
    BackgroundWeather,
    WeatherCityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
