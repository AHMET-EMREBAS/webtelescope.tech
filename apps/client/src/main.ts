/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { styleElements } from '@webpackages/material';
bootstrapApplication(AppComponent, appConfig)
  .then(() => {
    styleElements();
  })
  .catch((err) => {
    console.error(err);
  });
