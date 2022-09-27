import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DataSharingService } from '../../shared/services/data-sharing.service';

@Component({
  selector: 'app-checkbox-disabled',
  templateUrl: './checkbox-disabled.component.html',
  styleUrls: ['./checkbox-disabled.component.scss']
})
export class CheckboxDisabledComponent implements ICellRendererAngularComp {

  params;
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

}


