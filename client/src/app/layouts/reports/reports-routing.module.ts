import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  // {
  //   path:'',
  //   component:ReportComponent
  // },
  {
    path:'Assessment',
    component: ReportComponent,
    data: { title:'Reports > Assessment Report'},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
