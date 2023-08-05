import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as DocsActions from './docs.actions';
import * as DocsFeature from './docs.reducer';

@Injectable()
export class DocsEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DocsActions.initDocs),
      switchMap(() => of(DocsActions.loadDocsSuccess({ docs: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(DocsActions.loadDocsFailure({ error }));
      })
    )
  );
}
