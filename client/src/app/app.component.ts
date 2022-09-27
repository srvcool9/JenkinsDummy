import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Subscription } from 'rxjs';

export let browserRefresh = false;
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body',
  template: '<router-outlet></router-outlet><lib-ng-toast></lib-ng-toast>',
})


export class AppComponent implements OnInit {
  title = '';
  subscription: Subscription;
  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
   
    iconSetService.icons = { ...iconSubset };
   this.subscription= router.events.subscribe((evt) => {
      if ((evt instanceof NavigationEnd)) {
        browserRefresh = !this.router.navigated;
      }
    });
  }
  
  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
