import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconList } from '../common';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'wt-icons',
  standalone: true,
  imports: [CommonModule, MatIconModule, ClipboardModule],
  templateUrl: './icons.component.html',
  styleUrl: './icons.component.scss',
})
export class IconsComponent {
  iconList = IconList;
}
