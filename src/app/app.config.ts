import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import * as Sentry from '@sentry/angular';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(),
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler(),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
  ]
};
