import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PointsChartComponent } from '../pages/points-chart/points-chart.component';

@NgModule({
  imports: [
    CommonModule,
    NgApexchartsModule,
    PointsChartComponent
  ],
  exports: [PointsChartComponent]
})
export class PointsChartModule { }
