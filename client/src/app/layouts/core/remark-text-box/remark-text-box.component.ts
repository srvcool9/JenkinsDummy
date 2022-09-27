import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DataSharingService } from '../../shared/services/data-sharing.service';

@Component({
  selector: 'app-remark-text-box',
  templateUrl: './remark-text-box.component.html',
  styleUrls: ['./remark-text-box.component.scss']
})
export class RemarkTextBoxComponent implements ICellRendererAngularComp {

  params:any;
  status: any;
  constructor(
    private router: Router,
    private ngZone: NgZone,
    private dataSharingService: DataSharingService,
  ) { }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onRemarkTextBox($event){
    if (this.params.onRemarkTextBox instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data,
      };
      this.dataSharingService.setGlobalEditData(this.params.node.data);
      this.params.onRemarkTextBox(params);
    }
  }


}
