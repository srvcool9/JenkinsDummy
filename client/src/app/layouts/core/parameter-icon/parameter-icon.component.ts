import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { UserRoleService } from '../../configurations/service/manage role service/user-role.service';
import { DataSharingService } from '../../shared/services/data-sharing.service';

@Component({
  selector: 'app-parameter-icon',
  templateUrl: './parameter-icon.component.html',
  styleUrls: ['./parameter-icon.component.scss']
})
export class ParameterIconComponent implements ICellRendererAngularComp {

  params: any;
  constructor( private router: Router,
    private dataSharingService: DataSharingService,
    private ngZone: NgZone,) { }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onIconClick($event,link) {
    this.ngZone.run(() => {
      this.router.navigate([link]);
    });
    if (this.params.onIconClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data,
      };
      this.dataSharingService.setGlobalEditData(this.params.node.data);
      this.params.onIconClick(params);
    }
  }

}
