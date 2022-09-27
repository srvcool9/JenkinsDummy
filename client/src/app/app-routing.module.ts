import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { ForgotPasswordComponent } from './views/pages/forgot-password/forgot-password.component';
import { AgGridComponent } from './views/grids/ag-grid/ag-grid.component';
import { ConfigurationsModule } from './layouts/configurations/configurations.module';
import { RegistrationComponent } from './layouts/baseline/component/verfication/registration/registration.component';
import { VerificationCodeComponent } from './layouts/baseline/component/verfication/registration/verification-code/verification-code.component';
import { RegistrationSuccessComponent } from './layouts/baseline/component/verfication/registration/registration-success/registration-success.component';
import { HomeComponent } from './views/pages/homepage/components/home/home.component';
import { Page401Component } from './views/pages/page401/page401.component';
// import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
   path : 'registration',
   component : RegistrationComponent
  },
  {
   path : 'verification',
   component : VerificationCodeComponent
  },
  {
    path : 'registration-success',
    component : RegistrationSuccessComponent
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule),
          // canActivate : [AuthGuard]
        },
      {
           path:'grid',
           loadChildren: () =>
           import ('./layouts/data-grid/data-grid.module').then((m)=>m.DataGridModule)
      },
     {
         path:'Config',
         loadChildren:()=>
         import ('./layouts/configurations/configurations.module').then((m)=>m.ConfigurationsModule)
     },
     {
         path:'baseline',
         loadChildren : ()=>
         import ('./layouts/baseline/baseline.module').then((m)=> m.BaselineModule)
     },
     {
       path: 'Reports',
       loadChildren : ()=>
       import ('./layouts/reports/reports.module').then((m)=>m.ReportsModule)
     },
     {
      path: 'training',
      loadChildren : ()=>
      import ('./layouts/training/training.module').then((m)=>m.TrainingModule)
    },
    {
      path: 'monitoring',
      loadChildren : ()=>
      import ('./layouts/monitoring/monitoring.module').then((m)=>m.MonitoringModule)
    },
      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      }
    ]
  },
  {
    path : 'agGrid',
    component : AgGridComponent
  },
  {
    path: '401',
    component: Page401Component,
    data: {
      title: 'Page 401'
    }
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'homepage',
    component: HomeComponent,
    data: {
      title: 'HomePage'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path:'forgot',
    component: ForgotPasswordComponent,
    data : {
      title: 'Forgot page'
    }

  },
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
