import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AgGriddComponent} from './ag-gridd/ag-gridd.component'
import { DataTableComponent } from './data-table/data-table.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Grid',
  },
  children: [
    {
      path: '',
      redirectTo: 'aggrid',
    },
    {
      path: 'aggrid',
      component: AgGriddComponent,
      data: {
        title: 'AgGrid',
      },
    },
    {
      path: 'datatable',
      component:DataTableComponent,
      data: {
        title: 'DataTable',
      },
    },
  ],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataGridRoutingModule { }
