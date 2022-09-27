import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';
import { DragDropModule } from '@angular/cdk/drag-drop';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';
// import {AgGridModule} from 'ag-grid-angular'
import {
  AvatarModule,
  
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { AgGridComponent } from './views/grids/ag-grid/ag-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AgGriddComponent } from './layouts/data-grid/ag-gridd/ag-gridd.component';
import { NgToastModule } from 'ng-angular-popup';
import { DataTablesModule } from 'angular-datatables';
import {SessionStorageService} from 'ngx-webstorage';
import {ToasterModule} from "angular2-toaster";
import { ToastrModule } from 'ngx-toastr';
import { NgbModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { AppConfig } from './app.config';
import {ToasterService} from 'angular2-toaster';
// import {AuthGuard} from './auth.guard';
import {TokenInterceptor} from './token.interceptor';
import { NgSelectModule } from '@ng-select/ng-select';
import { CookieService } from 'ngx-cookie-service';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {CoreModule} from '../app/layouts/core/core.module';
import { SortablejsModule } from 'ngx-sortablejs';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];


export function TranslationLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/','.json')
}


@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS, AgGridComponent],
  imports: [
    BrowserModule,DragDropModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    ReactiveFormsModule,
    FormModule,
    SidebarModule,
    IconModule,
    PerfectScrollbarModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage:'en',
      loader: {
        provide: TranslateLoader,
        useFactory: TranslationLoaderFactory,
        deps: [HttpClient],
      },
    }),
    // AngularSlickgridModule.forRoot(),
    AgGridModule.withComponents([]),
    NgToastModule,
    DataTablesModule,
    ToasterModule.forRoot(),
    ToastrModule.forRoot(),
    AvatarModule,
    NgbPopoverModule,
    SortablejsModule.forRoot({
      animation: 200,
    }),
    NgSelectModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    
    {
       provide : HTTP_INTERCEPTORS,
       useClass : TokenInterceptor,
       multi : true
    },
    IconSetService,
    Title,
    SessionStorageService,
    AppConfig,
    ToasterService,
    CookieService,
    // AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
