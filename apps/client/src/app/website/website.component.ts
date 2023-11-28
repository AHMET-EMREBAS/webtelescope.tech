import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WebLayoutComponent } from '@webpackages/material';
@Component({
  selector: 'wt-website',
  standalone: true,
  imports: [CommonModule, RouterModule, WebLayoutComponent],
  templateUrl: './website.component.html',
  styleUrl: './website.component.scss',
})
export class WebsiteComponent {}
