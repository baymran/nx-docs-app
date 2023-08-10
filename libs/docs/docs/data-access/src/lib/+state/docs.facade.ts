import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as DocsActions from './docs.actions';
import * as DocsFeature from './docs.reducer';
import * as DocsSelectors from './docs.selectors';
import {tap} from "rxjs";

@Injectable()
export class DocsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  public readonly status$ = this.store.pipe(select(DocsSelectors.selectDocsStatus));
  public readonly allDocs$ = this.store.pipe(select(DocsSelectors.selectAllDocs), tap(console.log));
  public readonly selectedDocs$ = this.store.pipe(select(DocsSelectors.selectEntity));
  public readonly openedDocument$ = this.store.select(DocsSelectors.selectOpenedDocument);

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(DocsActions.initDocs());
  }
}
