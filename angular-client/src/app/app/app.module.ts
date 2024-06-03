import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { DashboardEntitiesComponent } from '../pages/dashboard-entities/dashboard-entities.component';
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
    DashboardEntitiesComponent,
    PointsChartComponent,
  ],
  providers: [],
})
export class AppModule { }
