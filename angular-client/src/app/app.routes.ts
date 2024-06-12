import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DonationListComponent } from './pages/donation-list/donation-list.component';
import { EntityRegisterComponent } from './pages/entity-register/entity-register.component';
import { authGuard } from './auth.guard';
import { EntityDetailedViewComponent } from './pages/entity-detailed-view/entity-detailed-view.component';
import { DonorDashboardComponent } from './pages/donor-dashboard/donor-dashboard.component';
import { DonationFormComponent } from './pages/donation-form/donation-form.component';
import { ChangePointsDonorComponent } from './pages/change-points-donor/change-points-donor.component';


export const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },

    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        children: [
            {
                path: 'entity',
                component: EntityRegisterComponent//,canActivate:[authGuard]
            }
        ]
    },

    {

        path: 'dashboard',
        children: [
            {
                path: "",
                component: DashboardComponent, canActivate: [authGuard],
            },
            {
                path: "donation-list",
                component: DonationListComponent, canActivate: [authGuard],
            },
            {
                path: "detailed-view",
                component: EntityDetailedViewComponent
            }
        ]

    },
    {
        path: 'dashboard/donors',
        children: [
            {
                path: "",
                component: DonorDashboardComponent, canActivate: [authGuard],
            },
            {
                path: "make-donation-form",
                component: DonationFormComponent, canActivate: [authGuard],
            },
            {
                path: "donation-list",
                component: DonationFormComponent, canActivate: [authGuard],
            },
        ]
    },
    {
        path: 'tickets',
        component: ChangePointsDonorComponent
    },
];
