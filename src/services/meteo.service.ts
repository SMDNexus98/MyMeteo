import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { MeteoInfo } from '../pages/homepage/components/city-card/om/meteo-info.model';
import { City } from '../pages/homepage/components/city-card/city-card.component';

@Injectable({
  providedIn: 'root'
})
export class MeteoService {

  private token = '&appid='+environment.tokenMeteo;
  private weatherData: string = "https://api.openweathermap.org/data/2.5/weather";
  private weatherGeo: string = "http://api.openweathermap.org/geo/1.0/zip";

  public weatherCity$: BehaviorSubject<City> = new BehaviorSubject<City>(new City());

  constructor(private http: HttpClient) { }

  public async getCurrentWeather(city: City):Promise<MeteoInfo> {
    const coordinates = await lastValueFrom(this.getCoordinates(city));
    return lastValueFrom(this.http.get<any>(this.weatherData+'?lat='+coordinates.lat+'&lon='+coordinates.lon+'&lang=it'+this.token));
  }

  private getCoordinates(city: any):Observable<any> {
    return this.http.get<any>(this.weatherGeo+'?zip='+city.zip+','+city.countryCode+this.token);
  }
}
