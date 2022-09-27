import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgGridDComponent } from './component/ag-grid-d/ag-grid-d.component';
import { SlickGridComponent } from './component/slick-grid/slick-grid.component';




const routes: Routes = [
  {
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
        component:AgGridDComponent,
        data: {
          title: 'AgGrid',
        },
      },
      {
        path: 'datagrid',
        component: SlickGridComponent,
        data: {
          title: 'SlickGrid',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThemeRoutingModule {}
