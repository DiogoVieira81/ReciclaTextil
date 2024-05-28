import { Routes } from '@angular/router';
import { DonorHomeComponent } from './pages/donor-home/donor-home.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';

export const routes: Routes = [
    {
        path : "login",
        component : LoginComponent
    },
    {
        path : "",
        redirectTo : "login",
        pathMatch : "full"
    },
    {
        path : "",
        component : LayoutComponent,
        children : [
            {
                path : "home",
                component : DonorHomeComponent
            }
        ]
    },
    {
        path : "**",
        component : LoginComponent
    }
];
