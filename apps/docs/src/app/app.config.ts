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
import {provideRouterStore, routerReducer} from "@ngrx/router-store";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {provideEnvironmentNgxMask} from "ngx-mask";

export const appConfig: ApplicationConfig = {
  providers: [
    DocsFacade,
    provideStore({router: routerReducer}),
    provideState(fromDocs.DOCS_FEATURE_KEY, fromDocs.docsReducer),
    provideRouterStore(),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideEffects(docsEffects),
    DocsFacade,
    provideHttpClient(),
    {
      provide: API_URL,
      useValue: environment.api_url,
    },
    { provide: LOCALE_ID, useValue: 'ru' },
    importProvidersFrom(MatDatepickerModule,
    MatNativeDateModule),
    provideEnvironmentNgxMask(),
    provideAnimations(),
    provideStoreDevtools({ logOnly: !isDevMode() }),
  ],
};
