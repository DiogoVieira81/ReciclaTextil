import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DonationListComponent } from './pages/donation-list/donation-list.component';
import { EntityRegisterComponent } from './pages/entity-register/entity-register.component';
import { authGuard } from './auth.guard';
import { TesteComponent } from './teste/teste.component';

export const routes: Routes = [
{
    path:'',redirectTo:'login',pathMatch:'full'
},
{
    path:'teste',
    component:TesteComponent,canActivate:[authGuard]
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
            component : EntityRegisterComponent,
        }
    ]
},
{
   
    path:'dashboard',
    children : [
        {
            path : "",
            component:DashboardComponent
        },
        {
            path : "donation-list",
            component : DonationListComponent
        }
    ]
        
},

];
