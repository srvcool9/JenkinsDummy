import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { DataSharingService } from '../../shared/services/data-sharing.service';

@Component({
  selector: 'app-power-icon',
  templateUrl: './power-icon.component.html',
  styleUrls: ['./power-icon.component.scss'],
})
export class PowerIconComponent implements ICellRendererAngularComp {
  params: any;
  constructor(
    private router: Router,
    private ngZone: NgZone,
    private dataSharing: DataSharingService
  ) {}

  agInit(params: any): void {
    if(params.data!=null && params.data!=undefined)
    this.params = params.data.launchStatus.id;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onPowerIconClick($event) {
    if (this.params.onPowerIconClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data,
      };
      this.dataSharing.setGlobalEditData(this.params.node.data);
      this.params.onPowerIconClick(params);
    }
  }

  onPowerIconClickCheck($event){
    if (this.params.onPowerIconClickCheck instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data,
      };
      this.dataSharing.setGlobalEditData(this.params.node.data);
      this.params.onPowerIconClickCheck(params);
    }
  }
}
