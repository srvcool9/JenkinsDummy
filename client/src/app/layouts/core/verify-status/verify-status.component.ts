import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DataSharingService } from '../../shared/services/data-sharing.service';

@Component({
  selector: 'app-verify-status',
  templateUrl: './verify-status.component.html',
  styleUrls: ['./verify-status.component.scss']
})
export class VerifyStatusComponent implements ICellRendererAngularComp {

  params;
  status;
  constructor(
    private dataSharing : DataSharingService
  ) { }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onSwitchClick($event){
    this.status = $event.target.checked;
    this.params.node.data.verify = this.status;
    if (this.params.onSwitchClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data,

      };
      this.dataSharing.setGlobalEditData(this.params.node.data);
      this.params.onSwitchClick(params);
    }
    
  }


}
