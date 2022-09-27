import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllocationComponent } from './component/allocation/allocation.component';
import { AddParameterComponent } from './component/parameter/add-parameter/add-parameter.component';
import { ParameterComponent } from './component/parameter/parameter.component';
import { SelfAssessmentComponent } from './component/self-assessment/self-assessment.component';
import {SectionsComponent} from './component/sessions/sections.component';
import { WeightageComponent } from './component/weightage/weightage.component';

const routes: Routes = [
  {
    path: 'sections',
    component : SectionsComponent,
    data: { title: 'Monitoring > Sections' },
  },
   {
    path: 'weightage',
    component : WeightageComponent,
    data: { title: 'Monitoring > Section > Weightage' },
  },
  {
    path: 'parameters',
    component : ParameterComponent,
    data: { title: 'Monitoring > Parameters' },
  },
  {
    path:'add_parameter',
    component: AddParameterComponent,
    data: { title: 'Monitoring > Parameters > Add Parameter' },
  },
  {
    path: 'allocation',
    component : AllocationComponent,
    data: { title: 'Monitoring > Allocation' },
  },
  {
    path: 'selfassessment',
    component : SelfAssessmentComponent,
    data: { title: 'Monitoring > Self-Assessment' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoringRoutingModule { }
