import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, finalize, Observable, switchMap } from 'rxjs';
import { Coord } from '../components/city-card/om/meteo-info.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  private businessPath: string = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';

  constructor(private http: HttpClient) { }

  loading: boolean = false;
  limit: number;
  offSet: number;

  public getBusiness(coord: Coord, textSearch?: string): Observable<any> {
    var params: any = {
      latitude: coord.lat,
      longitude: coord.lon
    }
    if (this.limit) params.limit = this.limit;
    if (this.offSet) params.offset = this.offSet;
    if (textSearch) params.term = textSearch;
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${environment.tokenBusiness}`
      }),
      params: params
    };
    return this.http.get<any>(this.businessPath, httpOptions);
  }

  search(terms: Observable<string>, coord: Coord) {
    return terms.pipe(
      debounceTime(400),
      switchMap(term => {
        this.loading = true;
        return this.getBusiness(coord, term);
      }),
      catchError(error => {
        this.loading = false;
        console.log(error);
        return error;
      }));
  }

}
