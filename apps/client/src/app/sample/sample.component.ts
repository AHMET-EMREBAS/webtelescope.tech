import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Quill from 'quill';

import Chart from 'chart.js/auto';

@Component({
  selector: 'wt-sample',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sample.component.html',
  styleUrl: './sample.component.scss',
})
export class SampleComponent implements AfterViewInit {
  @ViewChild('editor')
  editor!: ElementRef<HTMLDivElement>;

  @ViewChild('chart')
  chartRef!: ElementRef<HTMLCanvasElement>;
  ngAfterViewInit(): void {
    new Quill(this.editor.nativeElement, {
      theme: 'snow',
    });

    const chart = new Chart(this.chartRef.nativeElement, {
      type: 'doughnut',

      data: {
        datasets: [
          {
            label: 'First',
            data: [1, 2, 3, 4, 5, 6, 7, 8],
            borderColor: 'red',
            backgroundColor:'red'
          },
          {
            label: 'Second',
            data: [1, 2, 3, 4, 5, 6, 7, 8],
            borderColor: 'blue',
            backgroundColor:'blue'
          },
          {
            label: 'Third',
            data: [1, 2, 3, 4, 5, 6, 7, 8],
            borderColor: 'orange',
            backgroundColor:'orange'
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
