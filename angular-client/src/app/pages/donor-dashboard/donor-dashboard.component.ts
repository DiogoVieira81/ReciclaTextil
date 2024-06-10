import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { RestService } from '../rest.service';
Chart.register(...registerables);
NgModel;

@Component({
  selector: 'app-donor-dashboard',
  imports: [CommonModule],
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
  entities: any;
  router: any;

  constructor(private authService: AuthService,
    private rest: RestService,

    private http: HttpClient) { }

  ngOnInit(): void {
    this.donorID = this.authService.getUserIdFromToken();
    if (this.donorID) {
      this.authService.getUserDetails(this.donorID).subscribe(user => {
        this.authService.setUser(user);
        if (user.points !== undefined) {
          this.getDonations();
        } else {
          this.router.navigate(['/dashboard']);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
    this.listEntities();
  }

  logout(): void {
    alert('Sessão terminada');
    this.authService.loggout();
  }

  loadDonorData(donorID: string): void {
    this.http
      .get(`http://localhost:3000/donors/list/${donorID}/api`)
      .subscribe((donor) => {
        this.donorData = donor;
      });
  }

  /**
   * list all entities
   */
  listEntities() {
    this.rest.getEntities().subscribe((data) => {
      this.entities = data;
    });
  }

  /**
   * getter for the donations
   */
  getDonations() {
    this.rest.getDonations().subscribe((data) => {
      console.log(data);
      this.data = data;

      if (this.data != null) {
        this.data.forEach((data: any) => {
          let barIndex = this.barChartLabelData.indexOf(data.donor.name);
          if (data.donor.id === this.donorID) {
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

  /**
   * renders a bar chart
   * @param labelData the label data
   * @param valueData the value of the data
   * @param chartID the id of the chart
   * @param label the label name
   */
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

  /**
   * renders a pie chart
   * @param labelData the label data
   * @param valueData the value of the data
   * @param chartID the id of the chart
   * @param label the label name
   */
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

  /**
   * renders the donut chart
   * @param labelData the data label
   * @param valueData the values of the data
   * @param chartID the id of the chart
   * @param label the label name
   */
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
