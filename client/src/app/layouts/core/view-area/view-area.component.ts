import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { PopoverDirective } from '@coreui/angular';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Area } from '../../configurations/model/manage role model/area.model';

@Component({
  selector: 'app-view-area',
  templateUrl: './view-area.component.html',
  styleUrls: ['./view-area.component.scss']
})


export class ViewAreaComponent implements OnInit, ICellRendererAngularComp  {

  private params : any;
  areaLenght:number;
  areas:Area[]=[];
  @ViewChildren(PopoverDirective) popovers: QueryList<PopoverDirective>;
  constructor() { }
  refresh(params: ICellRendererParams): boolean {
   return true;
  }
  agInit(params: any): void {
    this.params = params;
    this.areaLenght=params.data.area.length;
    this.areas=params.data.area;
  }

  ngOnInit(): void {
  }
  
 

}
