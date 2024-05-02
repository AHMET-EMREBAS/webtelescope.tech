import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'wt-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent implements AfterViewInit {
  @ViewChild('chart') chartRef!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    const chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',

      data: {
        datasets: [
          {
            label: 'First',
            data: [1, 2, 3, 4, 5, 6, 7, 8],
            borderColor: 'red',
            backgroundColor: 'red',
          },
          {
            label: 'Second',
            data: [1, 2, 3, 4, 5, 6, 7, 8],
            borderColor: 'blue',
            backgroundColor: 'blue',
          },
          {
            label: 'Third',
            data: [1, 2, 3, 4, 5, 6, 7, 8],
            borderColor: 'orange',
            backgroundColor: 'orange',
          },
        ],
        labels: ['First', 'Second', 'Third'],
        yLabels: ['Some', 'Other', 'Any'],
        xLabels: ['Some-x', 'Other', 'Any'],
      },
      options: {
        responsive: true,
      },
    });
  }
}
