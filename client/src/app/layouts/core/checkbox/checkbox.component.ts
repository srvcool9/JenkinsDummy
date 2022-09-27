import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DataSharingService } from '../../shared/services/data-sharing.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements ICellRendererAngularComp {
  params;
  status: any;
  constructor(private dataSharingService: DataSharingService) {}

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onCheckBoxClick($event) {
    this.status = $event.target.checked;
    this.params.node.data.isPresent = this.status;
    if (this.status === true) {
      this.params.data.hasRemarkDisabled = true;
    } else {
      this.params.data.hasRemarkDisabled = false;
    }

    if (this.params.onCheckBoxClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data,
      };
      this.dataSharingService.setGlobalEditData(this.params.node.data);
      this.params.onCheckBoxClick(params);
    }
  }
}
