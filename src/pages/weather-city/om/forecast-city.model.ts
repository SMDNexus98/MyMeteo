import { Coord, MeteoInfo } from "../../../components/city-card/om/meteo-info.model";

export class ForecastCity {
    cod: string;
    message: number;
    cnt: number;
    list: MeteoInfo[];
    city: City;
}

export interface City {
    id: number;
    name: string;
    coord: Coord;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}

export interface MainClass {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
}