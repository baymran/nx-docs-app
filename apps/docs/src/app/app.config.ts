import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode, LOCALE_ID,
} from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { API_URL } from '@core/http';
import { environment } from '../environments/environment.development';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {docsEffects, DocsFacade, fromDocs} from "@docs/data-access";

export const appConfig: ApplicationConfig = {
  providers: [
    DocsFacade,
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideStore(),
    provideState(fromDocs.DOCS_FEATURE_KEY, fromDocs.docsReducer),
    provideEffects(docsEffects),
    DocsFacade,
    provideHttpClient(),
    {
      provide: API_URL,
      useValue: environment.api_url,
    },
    { provide: LOCALE_ID, useValue: 'ru' },
    provideAnimations(),
    provideStoreDevtools({ logOnly: !isDevMode() }),
  ],
};
