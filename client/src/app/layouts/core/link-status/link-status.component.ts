import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DataSharingService } from '../../shared/services/data-sharing.service';

@Component({
  selector: 'app-link-status',
  templateUrl: './link-status.component.html',
  styleUrls: ['./link-status.component.scss']
})
export class LinkStatusComponent implements ICellRendererAngularComp {

  params: any;
  constructor(private ngZone: NgZone, private router: Router, private dataSharingService: DataSharingService) { }
  agInit(params: any): void {
    this.params = params;
  }

  onLinkClick($event, link) {
    this.ngZone.run(() => {
      this.router.navigate([link]);
    });
    if (this.params.onLinkClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data,
      };
      this.dataSharingService.setGlobalEditData(this.params.node.data);
      this.params.onLinkClick(params);
    }
  }

  refresh(params?: any): boolean {
    return true;
  }

  navigate(link) {
    this.ngZone.run(() => {
      this.router.navigate([link, this.params.value]);
    });
  }

}
