import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  styleUrls: ['./page-not-found.component.scss'],
  template: `
  <div class="row w-100 justify-content-center p-4">
    <div class="col-12 text-center">
      <img class="responsive" src="../../assets/img/404.png" alt="404 not found">
    </div>
    <div class="col-12 text-center mt-4">
      Torna alla <button type="button" class="btn btn-primary" (click)="goToHomePage()">HomePage</button>
    </div>
  </div>`,
})
export class PageNotFoundComponent {

  constructor(private router: Router) { }

  goToHomePage() {
    this.router.navigate(['']);
  }

}
