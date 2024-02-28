import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { initStyles } from '@webpackages/material';
bootstrapApplication(AppComponent, appConfig)
  .then(() => {
    initStyles();
  })
  .catch((err) => {
    console.error(err);
  });
