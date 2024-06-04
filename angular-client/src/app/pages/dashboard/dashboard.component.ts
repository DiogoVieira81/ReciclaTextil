import { Component, OnInit } from '@angular/core';
import { Chart, registerables, scales } from 'chart.js';
import { RestService } from '../rest.service';
import { Donation } from '../../models/donation';
import { Donor } from '../../models/donor';
import { ActivatedRoute } from '@angular/router';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  data: any;
  entityID: string | null = ' ';

  barChartLabelData: string[] = [];
  barChartValueData: number[] = [];

  pieChartLabelData: string[] = [];
  pieChartValueData: number[] = [];

  doughnutChartLabelData: string[] = [];
  doughnutChartValueData: number[] = [];

  constructor(private rest: RestService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getDonations();
  }

  getDonations() {
    this.route.paramMap.subscribe((params) => {
      this.entityID = params.get('id');
      console.log(this.entityID);
    });

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
          if (doughnutIndex === -1 && data.entity.id === this.entityID) {
            this.doughnutChartLabelData.push(data.donor.name);
            this.doughnutChartValueData.push(data.kg);
          } else {
            this.doughnutChartValueData[doughnutIndex] += data.kg;
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
