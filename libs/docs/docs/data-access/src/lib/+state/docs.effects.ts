import {inject} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {switchMap, catchError, of, map, withLatestFrom, filter, tap} from 'rxjs';
import * as DocsActions from './docs.actions';
import {ApiService} from "@core/http";
import {
  CreateDocumentDTO,
  docsDtoAdapter,
  DocumentDTO, selectDetailIdFromURL
} from "@core/data-access";
import {select, Store} from "@ngrx/store";
import {selectDocsEntities} from "./docs.selectors";


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

export const addOneDocument = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(DocsActions.addNewDocument.addDocument),
      switchMap(({document}) => apiService.post<DocumentDTO, CreateDocumentDTO>(
        `/documents/`, document
      ).pipe(
        map(document => docsDtoAdapter.DTOtoEntity(document)),
        map(document => DocsActions.addNewDocument.addDocumentSuccess({document})),
        catchError(error => of(DocsActions.addNewDocument.addDocumentFailure({error})))
      ))
    )
  }, {functional: true}
)

export const editDocument = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const docsEntities$ = inject(Store).pipe(select(selectDocsEntities));

    return actions$.pipe(
      ofType(DocsActions.updateDocument.updateDocument),
      tap((document) => console.log('EFFECTS', document)),
      withLatestFrom(docsEntities$),
      filter(([{document}, docsEntities]) =>
        Boolean(document.id && docsEntities[document.id])
      ),
      map(([{document}, docsEntities]) => ({
        ...docsEntities[document.id],
        ...document
      })),
      switchMap((document) =>
        apiService.put<DocumentDTO, DocumentDTO>(`/documents/${document.id}`, document).pipe(
          map(document => docsDtoAdapter.DTOtoEntity(document)),
          map(document =>
            DocsActions.updateDocument.updateDocumentSuccess({document})),
          catchError((error) => {
            console.error(error);
            return of(DocsActions.updateDocument.updateDocumentFailure)
          })
        ))


    )
  }, {functional: true}
)
