import { Component, OnInit } from '@angular/core';
import { Chart, registerables, scales } from 'chart.js';
import { RestService } from '../rest.service';
import { Donation } from '../../models/donation';
import { Donor } from '../../models/donor';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';
import { NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
Chart.register(...registerables);
NgModel;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  data: any;
  entityData: any;
  entityID: string | null = ' ';

  barChartLabelData: string[] = [];
  barChartValueData: number[] = [];

  pieChartLabelData: string[] = [];
  pieChartValueData: number[] = [];

  doughnutChartLabelData: string[] = [];
  doughnutChartValueData: number[] = [];

  constructor(
    private authService: AuthService,
    private rest: RestService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.entityID = this.authService.getUserIdFromToken();
    console.log('Entity ID:', this.entityID);
    this.getDonations();
  }

  logout(): void {
    alert('Sessão terminada');
    this.authService.loggout();
  }

  loadEntityData(entityID: string): void {
    this.http
      .get(`http://localhost:3000/entities/list/${entityID}/api`)
      .subscribe((entity) => {
        this.entityData = entity;
      });
  }

  getDonations() {
    this.rest.getDonations().subscribe((data) => {
      console.log(data);
      this.data = data;

      if (this.data != null) {
        this.data.forEach((data: any) => {

          let barIndex = this.barChartLabelData.indexOf(data.donor.name);
          if (data.entity._id === this.entityID) {
            if (barIndex === -1) {
              this.barChartLabelData.push(data.donor.name);
              this.barChartValueData.push(data.points);
            } else {
              this.barChartValueData[barIndex] += data.points;
            }
          }

          let pieIndex = this.pieChartLabelData.indexOf(data.condition);
          if (data.entity._id === this.entityID) {
            if (pieIndex === -1) {
              this.pieChartLabelData.push(data.condition);
              this.pieChartValueData.push(data.kg);
            } else {
              this.pieChartValueData[pieIndex] += data.kg;
            }
          }

          let doughnutIndex = this.doughnutChartLabelData.indexOf(
            data.donor.name
          );
          if (data.entity._id === this.entityID) {
            if (doughnutIndex === -1) {
              this.doughnutChartLabelData.push(data.donor.name);
              this.doughnutChartValueData.push(data.kg);
            } else {
              this.doughnutChartValueData[doughnutIndex] += data.kg;
            }
          }
        });
      }

      this.renderBarChart(
        this.barChartLabelData,
        this.barChartValueData,
        'barChart',
        'Points earned'
      );
      this.renderPieChart(
        this.pieChartLabelData,
        this.pieChartValueData,
        'pieChart',
        'Kgs'
      );
      this.renderDoughnutChart(
        this.doughnutChartLabelData,
        this.doughnutChartValueData,
        'pieChart2',
        'Kgs'
      );
    });
  }

  renderBarChart(labelData: any, valueData: any, chartID: any, label: any) {
    const chart = new Chart(chartID, {
      type: 'bar',
      data: {
        labels: labelData,
        datasets: [
          {
            label: label,
            data: valueData,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  renderPieChart(labelData: any, valueData: any, chartID: any, label: any) {
    const chart = new Chart(chartID, {
      type: 'pie',
      data: {
        labels: labelData,
        datasets: [
          {
            label: label,
            data: valueData,
            hoverOffset: 5,
          },
        ],
      },
      options: {
        responsive: false,
      },
    });
  }

  renderDoughnutChart(
    labelData: any,
    valueData: any,
    chartID: any,
    label: any
  ) {
    const chart = new Chart(chartID, {
      type: 'doughnut',
      data: {
        labels: labelData,
        datasets: [
          {
            label: label,
            data: valueData,
            hoverOffset: 5,
          },
        ],
      },
      options: {
        responsive: false,
      },
    });
  }
}
