import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {switchMap, catchError, of, map} from 'rxjs';
import * as DocsActions from './docs.actions';
import {ApiService} from "@core/http";
import {docsDtoAdapter, DocumentDTO} from "@core/data-access";


export const docsEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(DocsActions.initDocs),
      // delay(1500),
      switchMap(
        () => apiService.get<DocumentDTO[]>('/documents').pipe(
          map(
            (docs) => DocsActions.loadDocsSuccess({
              docs: docs.map(document => docsDtoAdapter.DTOtoEntity(document))
            })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(DocsActions.loadDocsFailure({ error }));
          })
        )
      ),
    )
  }, { functional: true }
)
