import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Coord, MeteoInfo } from '../components/city-card/om/meteo-info.model';
import { City } from '../components/city-card/city-card.component';
import { ForecastCity } from '../pages/weather-city/om/forecast-city.model';

@Injectable({
  providedIn: 'root'
})
export class MeteoService {

  private token = '&appid='+environment.tokenMeteo;
  
  private weatherData: string = "https://api.openweathermap.org/data/2.5/weather";
  private weatherGeo: string = "http://api.openweathermap.org/geo/1.0/zip";
  private weatherForecast: string = "http://api.openweathermap.org/data/2.5/forecast"

  public weatherCity$: BehaviorSubject<MeteoInfo> = new BehaviorSubject<MeteoInfo>(new MeteoInfo());

  constructor(private http: HttpClient) { }

  public async getCurrentWeather(city: City):Promise<MeteoInfo> {
    const coordinates = await lastValueFrom(this.getCoordinates(city));
    return lastValueFrom(this.http.get<any>(this.weatherData+'?lat='+coordinates.lat+'&lon='+coordinates.lon+'&lang=it'+this.token));
  }

  public getForecastCity(coord: Coord):Observable<ForecastCity> {
    return this.http.get<any>(this.weatherForecast+'?lat='+coord.lat+'&lon='+coord.lon+this.token);
  }

  private getCoordinates(city: City):Observable<any> {
    return this.http.get<any>(this.weatherGeo+'?zip='+city.zip+','+city.countryCode+this.token);
  }
}
