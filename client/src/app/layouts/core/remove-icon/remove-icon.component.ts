import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-remove-icon',
  templateUrl: './remove-icon.component.html',
  styleUrls: ['./remove-icon.component.scss']
})
export class RemoveIconComponent implements ICellRendererAngularComp {
  params: any;
  constructor() { }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onRemoveIconClick(event,type){
    if(type==='removeAllocationSchoolClass'){
    this.params.onRemoveIconClick(this.params);
    }

  }
 

  }
