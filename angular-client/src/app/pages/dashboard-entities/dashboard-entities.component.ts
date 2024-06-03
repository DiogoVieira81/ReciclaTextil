import { Component, OnInit } from '@angular/core';
import {  DashboardServiceService } from '../services/dashboard-service.service';
import { PointsChartComponent } from "../points-chart/points-chart.component";

@Component({
  selector: 'app-dashboard-entities',
  imports: [PointsChartComponent,],
  standalone: true,
  templateUrl: './dashboard-entities.component.html',
  styleUrls: ['./dashboard-entities.component.css']
})
export class DashboardEntitiesComponent implements OnInit {
  totalDonations!: number;
  totalPoints!: number;
  pointsOverTime!: any[];

  constructor(private dashboardService: DashboardServiceService) {}

  ngOnInit(): void {
    this.loadKPIs();
    this.loadPointsOverTime();
  }

  loadKPIs(): void {
    this.dashboardService.getEntityKPIs().subscribe(data => {
      this.totalDonations = data.totalDonations;
      this.totalPoints = data.totalPoints;
    });
  }

  loadPointsOverTime(): void {
    this.dashboardService.getPointsOverTime().subscribe(data => {
      this.pointsOverTime = data;
    });
  }
}
