import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MeteoService } from 'src/services/meteo.service';

@Injectable({
  providedIn: 'root'
})
export class CityGuard implements CanActivate {

  constructor(private meteoService: MeteoService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.meteoService.weatherCity$.getValue()?.coord)
            return true;
          this.router.navigate(['']);
        return false;
  }
}