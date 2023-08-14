import { Injectable, inject } from '@angular/core';
import { select, Store} from '@ngrx/store';

import * as DocsActions from './docs.actions';
import * as DocsSelectors from './docs.selectors';
import {docsDtoAdapter, DocumentEntity, onSuccessEditionCbType, selectNewValueFromURL} from "@core/data-access";

@Injectable()
export class DocsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  public readonly status$ = this.store.pipe(select(DocsSelectors.selectDocsStatus));
  public readonly allDocs$ = this.store.pipe(select(DocsSelectors.selectAllDocs));
  public readonly selectedDocs$ = this.store.pipe(select(DocsSelectors.selectEntity));
  public readonly openedDocument$ = this.store.select(DocsSelectors.selectOpenedDocument);
  public readonly isCreationMode$ = this.store.select(selectNewValueFromURL);

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(DocsActions.initDocs());
  }

  public loadDocumentFromUrl() {
    this.store.dispatch(DocsActions.loadOneDocument.loadDocument())
  }

  public createDocument(doc: DocumentEntity, onSuccessCb: onSuccessEditionCbType) {
    const document = docsDtoAdapter.entityToDTO(doc)
    this.store.dispatch(DocsActions.addNewDocument.addDocument({document, onSuccessCb}));
  }

  public updateDocument(doc: DocumentEntity, onSuccessCb: onSuccessEditionCbType) {
    const document = docsDtoAdapter.entityToDTO(doc)
    this.store.dispatch(DocsActions.updateDocument.updateDocument({document, onSuccessCb}))
  }

  public removeDocument(id: number) {
    this.store.dispatch(DocsActions.deleteDocument.deleteDocument({id}))
  }
}
