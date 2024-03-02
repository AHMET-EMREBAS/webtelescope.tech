import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'wt-flag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flag.component.html',
  styleUrl: './flag.component.scss',
})
export class FlagComponent implements OnInit {
  /**
   * 2 letters that represents the company name
   */
  @Input() country = 'us';

  @Input() ratio: '4x3' | '1x1' = '4x3';

  @Input() size = 50;

  width = '';

  height = '';

  flagPath = `url('https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/us.svg')`;

  ngOnInit(): void {
    this.flagPath = `url('https://raw.githubusercontent.com/lipis/flag-icons/main/flags/${this.ratio}/${this.country}.svg')`;
    this.width = this.size + 'px';
    this.height =
      this.ratio === '4x3' ? this.size * (3 / 4) + 'px' : this.width;
  }
}
