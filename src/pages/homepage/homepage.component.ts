import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeteoService } from 'src/services/meteo.service';
import { City } from '../../components/city-card/city-card.component';
import { MeteoInfo } from '../../components/city-card/om/meteo-info.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  citys: Array<City> = [
    { zip: 80100, countryCode: 'IT' },
    { zip: '10121', countryCode: 'IT' },
    { zip: 990007, countryCode: 'CO' },
    { zip: '0600', countryCode: 'NZ' },
    { zip: 6152, countryCode: 'AU' }
  ];

  constructor(private meteoService: MeteoService, private router: Router) { }

  ngOnInit(): void {
  }

  onClickCity(meteoInfo: MeteoInfo) {
    this.meteoService.weatherCity$.next(meteoInfo);
    this.router.navigate(['weather-city']);
  }

}
