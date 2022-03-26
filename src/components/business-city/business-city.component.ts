import { Component, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { BusinessService } from '../../services/business.service';
import { Coord } from '../../components/city-card/om/meteo-info.model';
import { Business } from './om/business.model';
import { PaginatorComponent, PaginatorConfig } from '../paginator/paginator.component';
import { Subject, timer } from 'rxjs';

@Component({
  selector: 'app-business-city',
  templateUrl: './business-city.component.html',
  styleUrls: ['./business-city.component.scss']
})
export class BusinessCityComponent implements OnChanges, OnDestroy {
  @Input() coord: Coord;

  @ViewChild('paginator') paginator: PaginatorComponent;

  businesses: Array<Business> = new Array<Business>();
  configPaginator: PaginatorConfig;

  searchTerm$ = new Subject<string>();
  searchTerm: string = '';

  constructor(private businessService: BusinessService) {
    this.businessService.limit = 50;
    this.businessService.offSet = 0;
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['coord'] && !!changes['coord'].currentValue) {
      this.coord = changes['coord'].currentValue;
      this.getBusiness();
      this.subscribe();
    }
  }

  subscribe() {
    this.businessService.search(this.searchTerm$, this.coord)
      .subscribe(res => {
        this.businessService.loading = false
        this.businesses = res.businesses;
        this.resetPaginator(res.total);
      });
  }

  getBusiness() {
    this.businessService.loading = true;
    this.businessService.getBusiness(this.coord).subscribe({
      next: (res) => {
        this.businesses = res.businesses;
        this.businessService.loading = false;
        this.resetPaginator(res.total);
      },
      error: (error) => {
        console.log(error);
        this.businessService.loading = false;
      }
    });
  }

  onChangePage(currentPage: number, searchBox: HTMLInputElement) {
    this.businessService.offSet = ((currentPage * 10) - 10);
    if (!!searchBox && !!searchBox.value) {
      this.searchTerm$.next(searchBox.value);
    } else {
      this.getBusiness();
    }
  }

  onChangeInputSearch(event: string) {
    this.searchTerm$.next(event);
    this.businessService.offSet = 0;
  }

  resetPaginator(total: number) {
    const newConfigPaginator = { pageLimit: this.businessService.limit, total: total };
    if (JSON.stringify(newConfigPaginator) != JSON.stringify(this.configPaginator)) {
      this.configPaginator = newConfigPaginator;
    }
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
    } catch (error) { console.log(error) }
  }

}
