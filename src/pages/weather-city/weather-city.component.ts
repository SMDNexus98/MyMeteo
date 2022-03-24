import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MeteoService } from '../../services/meteo.service';
import { City } from '../homepage/components/city-card/city-card.component';
import { MeteoInfo } from '../homepage/components/city-card/om/meteo-info.model';
import { ForecastCity } from './om/forecast-city.model';

@Component({
  selector: 'app-weather-city',
  templateUrl: './weather-city.component.html',
  styleUrls: ['./weather-city.component.scss']
})
export class WeatherCityComponent implements OnInit, OnDestroy {

  constructor(private meteoService: MeteoService) { }

  citySub: Subscription;
  forecastCity: ForecastCity = new ForecastCity();
  range: number = 0;

  ngOnInit(): void {
    this.citySub = this.meteoService.weatherCity$.subscribe((info: MeteoInfo) => {
      this.meteoService.getForecastCity(info.coord).subscribe((res: ForecastCity) => {
        res.list.map(value => {
          value.name = res.city.name;
          value.sys.country = res.city.country;
        });
        this.forecastCity = res
      });
    });
  }

  onChangeRange() {
    console.log(this.range);
  }

  ngOnDestroy(): void {
    this.citySub.unsubscribe();
  }

}
