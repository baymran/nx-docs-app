import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as DocsActions from './docs.actions';
import * as DocsFeature from './docs.reducer';
import * as DocsSelectors from './docs.selectors';

@Injectable()
export class DocsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(DocsSelectors.selectDocsLoaded));
  allDocs$ = this.store.pipe(select(DocsSelectors.selectAllDocs));
  selectedDocs$ = this.store.pipe(select(DocsSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(DocsActions.initDocs());
  }
}
