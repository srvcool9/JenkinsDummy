import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AgGridModule} from 'ag-grid-angular';
import { DataGridRoutingModule } from './data-grid-routing.module';
import { AgGriddComponent } from './ag-gridd/ag-gridd.component';
import { TranslateModule } from '@ngx-translate/core';
import { DataTableComponent } from './data-table/data-table.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    AgGriddComponent,
    DataTableComponent
  ],
  imports: [
    CommonModule,
    DataGridRoutingModule,
    AgGridModule.withComponents([]),
    DataTablesModule,
    TranslateModule,
  ]
})
export class DataGridModule { }
