import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DataSharingService } from '../../shared/services/data-sharing.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent  implements ICellRendererAngularComp {

  params: any;
  constructor(private router : Router,
    private ngZone: NgZone,
    private dataSharing : DataSharingService) { }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onDetailClick($event,link) {
    this.ngZone.run(() => {
      this.router.navigate([link]);
    });
    if (this.params.onDetailClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data,

      };
      this.dataSharing.setGlobalEditData(this.params.node.data);
      this.params.onDetailClick(params);
    }
  }

  navigate(link) {
    this.ngZone.run(() => {
      this.router.navigate([link, this.params.value]);
    });
  }
}
