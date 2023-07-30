import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import {appRoutes} from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {API_URL} from "@core/http";
import {environment} from "../environments/environment.development";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
    {
        provide: API_URL,
        useValue: environment.api_url,
    },
    importProvidersFrom()
  ],
};
