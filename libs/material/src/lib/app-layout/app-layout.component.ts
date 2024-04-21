import {
  Component,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import {
  MainContentDirective,
  FloatingItemsDirective,
  ToolbarRightDirective,
  ToolbarLeftDirective,
  SidenavLeftDirective,
  SidenavRightDirective,
  StatusbarLeftDirective,
  StatusbarRighttDirective,
} from './app-layout.directive';

@Component({
  selector: 'wt-app-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
  ],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
})
export class AppLayoutComponent implements OnInit {
  @ViewChildren(MainContentDirective) mainContent?: any;
  @ViewChildren(FloatingItemsDirective) floatingItems?: any;
  @ViewChildren(ToolbarRightDirective) toolbarRight?: any;
  @ViewChildren(ToolbarLeftDirective) toolbarLeft?: any;
  @ViewChildren(SidenavLeftDirective) sidenavLeft?: any;
  @ViewChildren(SidenavRightDirective) sidenavRight?: any;
  @ViewChildren(StatusbarLeftDirective) statusbarLeft?: any;
  @ViewChildren(StatusbarRighttDirective) statusbarRightt?: any;

  ngOnInit(): void {
    console.log(this.mainContent);
  }
}
