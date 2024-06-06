import { Component, Input, OnChanges } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, NgApexchartsModule, ApexTitleSubtitle, ApexStroke, ApexGrid} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-points-chart',
  templateUrl: './points-chart.component.html',
  styleUrls: ['./points-chart.component.css'],
  standalone: true,
  imports: [NgApexchartsModule,]
})
export class PointsChartComponent implements OnChanges {
  @Input()
  data!: any[];

  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Points",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Points Over Time",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: []
      }
    };
  }

  ngOnChanges(): void {
    this.updateChart();
  }

  updateChart(): void {
    if (this.data) {
      this.chartOptions.series[0].data = this.data.map(d => d.value);
      this.chartOptions.xaxis.categories = this.data.map(d => d.date);
    }
  }
}
