import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
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
import * as fromDocs from './libs/docs/docs/data-access/src/lib/+state/docs.reducer';
import { DocsEffects } from './libs/docs/docs/data-access/src/lib/+state/docs.effects';
import { DocsFacade } from './libs/docs/docs/data-access/src/lib/+state/docs.facade';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideStore(),
    provideState(fromDocs.DOCS_FEATURE_KEY, fromDocs.docsReducer),
    provideEffects(DocsEffects),
    DocsFacade,
    provideHttpClient(),
    {
      provide: API_URL,
      useValue: environment.api_url,
    },
    provideAnimations(),
    provideStoreDevtools({ logOnly: !isDevMode() }),
  ],
};
