import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DonationListComponent } from './pages/donation-list/donation-list.component';

export const routes: Routes = [
{
    path:'',redirectTo:'login',pathMatch:'full'
},
{
    path:'login',
    component:LoginComponent
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
        
}
];
