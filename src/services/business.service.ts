import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, finalize, Observable, switchMap } from 'rxjs';
import { Coord } from 'src/pages/homepage/components/city-card/om/meteo-info.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  private businessPath: string = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';

  constructor(private http: HttpClient) { }

  loading: boolean = false;

  public getBusiness(coord: Coord, limit?: number, offSet?: number, textSearch?: string): Observable<any> {
    var params: any = {
      latitude: coord.lat,
      longitude: coord.lon
    }
    if (limit) params.limit = limit;
    if (offSet) params.offset = offSet;
    if (textSearch) params.term = textSearch;
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${environment.tokenBusiness}`
      }),
      params: params
    };
    return this.http.get<any>(this.businessPath, httpOptions);
  }

  search(terms: Observable<string>, coord: Coord, limit?: number) {
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => {
        this.loading = true;
        return this.getBusiness(coord, limit, undefined, term);
      }),
      catchError(error => {
        this.loading = false;
        console.log(error);
        return error;
      }));
  }

}
