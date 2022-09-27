import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DataSharingService } from '../../shared/services/data-sharing.service';

@Component({
  selector: 'app-eye-icon',
  templateUrl: './eye-icon.component.html',
  styleUrls: ['./eye-icon.component.scss']
})
export class EyeIconComponent implements ICellRendererAngularComp  {

 
  params: any;
  constructor(private router : Router, private ngZone : NgZone,
    private dataSharing : DataSharingService) { }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onIconClick($event,link) {
    this.ngZone.run(()=>{
this.router.navigate([link]);
    })
    if (this.params.onIconClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data,
      };
      this.dataSharing.setGlobalEditData(this.params.node.data);
      this.params.onIconClick(params);
    }
  }

  navigate(link) {
    this.ngZone.run(() => {
      this.router.navigate([link, this.params.value]);
    });
  }

}
