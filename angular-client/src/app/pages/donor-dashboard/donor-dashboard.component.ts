import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';
import { RestService } from '../rest.service';
Chart.register(...registerables);
NgModel;

@Component({
  selector: 'app-donor-dashboard',
  imports: [],
  standalone: true,
  templateUrl: './donor-dashboard.component.html',
  styleUrls: ['./donor-dashboard.component.css']
})
export class DonorDashboardComponent implements OnInit {
  data: any;
  entityData: any;
  entityID: string | null = ' ';

  barChartLabelData: string[] = [];
  barChartValueData: number[] = [];

  pieChartLabelData: string[] = [];
  pieChartValueData: number[] = [];

  doughnutChartLabelData: string[] = [];
  doughnutChartValueData: number[] = [];
  donorID: string | null = ' ';
  donorData!: any;

  constructor(private authService: AuthService,
    private rest: RestService,
    private http: HttpClient) {}

  ngOnInit(): void {
    this.donorID = this.authService.getUserIdFromToken();
    console.log('Donor ID:', this.donorID);
    this.getDonations();
  }

  logout(): void {
    alert('Sessão terminada');
    this.authService.loggout();
  }

  loadDonorData(donorID: string): void {
    this.http
      .get(`http://localhost:3000/donors/list/${donorID}/api`)
      .subscribe((entity) => {
        this.donorData = entity;
      });
  }

  getDonations() {
    this.rest.getDonations().subscribe((data) => {
      console.log(data);
      this.data = data;

      if (this.data != null) {
        this.data.forEach((data: any) => {
          let barIndex = this.barChartLabelData.indexOf(data.donor.name);
          if (data.entity.id === this.entityID) {
            if (barIndex === -1) {
              this.barChartLabelData.push(data.donor.name);
              this.barChartValueData.push(data.points);
            } else {
              this.barChartValueData[barIndex] += data.points;
            }
          }
          this.pieChartLabelData.push(data.condition);
          this.pieChartValueData.push(data.kg);

          let doughnutIndex = this.doughnutChartLabelData.indexOf(
            data.donor.name
          );

          if (data.entity.id === this.entityID) {
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
