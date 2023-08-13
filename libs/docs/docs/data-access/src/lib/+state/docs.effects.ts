import {inject} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {switchMap, catchError, of, map, withLatestFrom} from 'rxjs';
import * as DocsActions from './docs.actions';
import {ApiService} from "@core/http";
import {
  docsDtoAdapter,
  DocumentDTO, selectDetailIdFromURL
} from "@core/data-access";
import {Store} from "@ngrx/store";


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
            return of(DocsActions.loadDocsFailure({error}));
          })
        )
      ),
    )
  }, {functional: true}
)

export const loadOneDocument = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(DocsActions.loadOneDocument.loadDocument),
      // delay(1500),
      withLatestFrom(store.select(selectDetailIdFromURL)),
      switchMap(
        ([, id]) => {
          if (id) {
            return apiService.get<DocumentDTO>(`/documents/${id}`).pipe(
              map((document) => docsDtoAdapter.DTOtoEntity(document)),
              map((document) =>
                DocsActions.loadOneDocument.loadDocumentSuccess({document})),
              catchError((error) => {
                console.error('Error', error);
                return of(DocsActions.loadOneDocument.loadDocumentFailure({error}))
              })
            )
          }
          return of(DocsActions.loadOneDocument.loadDocumentFailure({error: 'User not found'}));
        }
      ),
    )
  }, {functional: true}
)
