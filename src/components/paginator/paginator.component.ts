import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnChanges {
  @Input() config: PaginatorConfig;
  @Output() onChangePage: EventEmitter<number> = new EventEmitter<number>();

  pageSelected: number = 1;
  pages: number;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['config'] && !!changes['config'].currentValue) {
      this.config = changes['config'].currentValue;
      this.configPaginator();
    }
  }

  configPaginator() {
    this.pages = Math.ceil(this.config.total / this.config.pageLimit);
    if (this.pages > 99)
      this.pages = 99;
  }

  prev() {
    if (this.pageSelected > 1) 
      this.onChangePage.emit(--this.pageSelected);
      
  }

  next() {
    if (this.pageSelected < this.pages)
      this.onChangePage.emit(++this.pageSelected);
  }

  onClickPage(page: number) {
    this.pageSelected = page;
    this.onChangePage.emit(this.pageSelected);
  }

  createPages(i: number) {
    return new Array(i);
  }

}

export class PaginatorConfig {
  pageLimit: number;
  total: number;
}
