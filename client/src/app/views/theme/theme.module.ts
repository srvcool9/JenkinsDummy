import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardModule, GridModule, NavModule, UtilitiesModule, TabsModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

// Theme Routing
import { ThemeRoutingModule } from './theme-routing.module';
import { AgGridDComponent } from './component/ag-grid-d/ag-grid-d.component';
import { SlickGridComponent } from './component/slick-grid/slick-grid.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    CommonModule,
    ThemeRoutingModule,
    CardModule,
    GridModule,
    UtilitiesModule,
    IconModule,
    NavModule,
    TabsModule,
    AgGridModule.withComponents([])
  ],
  declarations: [
    AgGridDComponent,
    SlickGridComponent,
  ]
})
export class ThemeModule {
}
