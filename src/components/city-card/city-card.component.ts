import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MeteoService } from '../../services/meteo.service';
import { MeteoInfo } from './om/meteo-info.model';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss']
})
export class CityCardComponent implements OnChanges {
  @Input() city: City;
  @Input() meteoInfo: MeteoInfo = new MeteoInfo();
  @Input() fullInfo: boolean = false;
  @Output() onClickCity: EventEmitter<MeteoInfo>= new EventEmitter<MeteoInfo>();

  constructor(private meteoService: MeteoService) { }
  
  
  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['city'] && !!changes['city'].currentValue) {
      this.city = changes['city'].currentValue;
      this.meteoService.getCurrentWeather(this.city).then((res: MeteoInfo) => this.meteoInfo = res);
    }
  }

}

export class City {
  zip: string | number;
  countryCode: string;
}
