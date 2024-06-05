import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { DonorDashboardComponent } from '../pages/donor-dashboard/donor-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PointsChartComponent } from '../pages/points-chart/points-chart.component'
import { PointsChartModule } from './points-chart.module';
import { NgApexchartsModule } from "ng-apexcharts"



@NgModule({
  declarations: [],
  imports: [
    AppComponent,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    PointsChartModule,
    NgApexchartsModule,
    DonorDashboardComponent,
    PointsChartComponent,
  ],
  providers: [],
})
export class AppModule { }
