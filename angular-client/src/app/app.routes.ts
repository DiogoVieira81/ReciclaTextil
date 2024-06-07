import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DonationListComponent } from './pages/donation-list/donation-list.component';
import { EntityRegisterComponent } from './pages/entity-register/entity-register.component';

import { authGuard } from './auth.guard';
import { EntityDetailedViewComponent } from './pages/entity-detailed-view/entity-detailed-view.component';

export const routes: Routes = [
{
    path:'',redirectTo:'login',pathMatch:'full'
},

{
    path:'login',
    component:LoginComponent
},
{
    path : 'register',
    children : [
        {
            path : 'entity',
            component : EntityRegisterComponent//,canActivate:[authGuard]
        }
    ]
},
{
   
    path:'dashboard',
    children : [
        {
            path : "",
            component:DashboardComponent,canActivate:[authGuard],
        },
        {
            path : "donation-list",
            component : DonationListComponent,canActivate:[authGuard],
        },
        {
            path : "detailed-view",
            component : EntityDetailedViewComponent
        }
    ]
        
},
];
