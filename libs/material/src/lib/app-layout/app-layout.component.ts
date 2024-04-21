import {
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
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

const AppLayoutDirectives = [
  MainContentDirective,
  FloatingItemsDirective,
  ToolbarRightDirective,
  ToolbarLeftDirective,
  SidenavLeftDirective,
  SidenavRightDirective,
  StatusbarLeftDirective,
  StatusbarRighttDirective,
];

export const AppLayoutModules = [
  CommonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
];
@Component({
  selector: 'wt-app-layout',
  standalone: true,
  imports: [...AppLayoutModules, ...AppLayoutDirectives],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
  providers: [...AppLayoutDirectives],
})
export class AppLayoutComponent implements OnInit {
  @ContentChildren(MainContentDirective)
  mainContent?: QueryList<MainContentDirective>;
  @ContentChildren(FloatingItemsDirective)
  floatingItems?: QueryList<FloatingItemsDirective>;
  @ContentChildren(ToolbarRightDirective)
  toolbarRight?: QueryList<ToolbarRightDirective>;
  @ContentChildren(ToolbarLeftDirective)
  toolbarLeft?: QueryList<ToolbarLeftDirective>;
  @ContentChildren(SidenavLeftDirective)
  sidenavLeft?: QueryList<SidenavLeftDirective>;
  @ContentChildren(SidenavRightDirective)
  sidenavRight?: QueryList<SidenavRightDirective>;
  @ContentChildren(StatusbarLeftDirective)
  statusbarLeft?: QueryList<StatusbarLeftDirective>;
  @ContentChildren(StatusbarRighttDirective)
  statusbarRightt?: QueryList<StatusbarRighttDirective>;

  /**
   * Test the app layout without pushing the content
   */
  @Input() testing = true;

  ngOnInit(): void {
    console.log(this.mainContent);
  }
}
