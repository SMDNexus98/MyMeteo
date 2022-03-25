import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { BusinessService } from '../../services/business.service';
import { Coord } from '../../pages/homepage/components/city-card/om/meteo-info.model';
import { Business } from './om/business.model';
import { PaginatorConfig } from '../paginator/paginator.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-business-city',
  templateUrl: './business-city.component.html',
  styleUrls: ['./business-city.component.scss']
})
export class BusinessCityComponent implements OnChanges, OnDestroy {
  @Input() coord: Coord;

  businesses: Array<Business> = new Array<Business>();
  configPaginator: PaginatorConfig;

  searchTerm$ = new Subject<string>();
  searchTerm: string = '';

  limit: number = 50;

  constructor(private businessService: BusinessService) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['coord'] && !!changes['coord'].currentValue) {
      this.coord = changes['coord'].currentValue;
      this.getBusiness(this.limit);
      this.subscribe();
    }
  }

  subscribe() {
    this.businessService.search(this.searchTerm$, this.coord, this.limit)
      .subscribe(res => {
        this.businessService.loading = false
        this.businesses = res.businesses;
        this.configPaginator = { pageLimit: this.limit, total: res.total };
      });
  }

  getBusiness(limit?: number, offSet?: number) {
    this.businessService.loading = true;
    this.businessService.getBusiness(this.coord, limit, offSet).subscribe(
      (res) => {
        this.businesses = res.businesses;
        this.configPaginator = { pageLimit: this.limit, total: res.total };
        this.businessService.loading = false;
      }, (error) => {
        console.log(error);
        this.businessService.loading = false;
      });
  }

  onChangePage(currentPage: number) {
    this.getBusiness(this.limit, ((currentPage * 10) - 10));
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }

  isLoading() {
    return this.businessService.loading;
  }

  ngOnDestroy(): void {
    try {
      this.searchTerm$.unsubscribe();
    } catch (error) {}
  }

}
