import { AfterViewInit, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'wt-navigation',
  templateUrl: './web-navigation.component.html',
  styleUrls: ['./web-navigation.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class WebNavigationComponent
  extends NavigationComponent
  implements AfterViewInit
{
  override miniSidenav = this.lss.get<boolean>(this.miniSideNavStoreKey, true);
}
