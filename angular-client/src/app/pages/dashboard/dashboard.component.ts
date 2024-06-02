import { Component, OnInit } from '@angular/core';
import { Chart, registerables, scales } from 'chart.js';
import { RestService } from '../rest.service';
import { Donation } from '../../models/donation';
import { Donor } from '../../models/donor';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  data: Donation[] = [];

  barChartLabelData: string[] = [];
  barChartValueData: number[] = [];

  pieChartLabelData: string[] = [];
  pieChartValueData: number[] = [];

  doughnutChartLabelData: string[] = [];
  doughnutChartValueData: number[] = [];

  constructor(private rest: RestService) {}

  ngOnInit(): void {
    this.getDonations();
  }

  getDonations() {
    this.rest.getDonations().subscribe((data) => {
      console.log(data);
      this.data = data;

      if (this.data != null) {
        this.data.forEach((o) => {
          let barIndex = this.barChartLabelData.indexOf(o.donor.name);
          if (barIndex === -1) {
            this.barChartLabelData.push(o.donor.name);
            this.barChartValueData.push(o.points);
          } else {
            this.barChartValueData[barIndex] += o.points;
          }

          this.pieChartLabelData.push(o.condition);
          this.pieChartValueData.push(o.kg);

          let doughnutIndex = this.doughnutChartLabelData.indexOf(o.donor.name);
          if (doughnutIndex === -1) {
            this.doughnutChartLabelData.push(o.donor.name);
            this.doughnutChartValueData.push(o.kg);
          } else {
            this.doughnutChartValueData[doughnutIndex] += o.kg;
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
