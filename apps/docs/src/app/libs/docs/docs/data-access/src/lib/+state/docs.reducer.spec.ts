import { Action } from '@ngrx/store';

import * as DocsActions from './docs.actions';
import { DocsEntity } from './docs.models';
import { DocsState, initialDocsState, docsReducer } from './docs.reducer';

describe('Docs Reducer', () => {
  const createDocsEntity = (id: string, name = ''): DocsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Docs actions', () => {
    it('loadDocsSuccess should return the list of known Docs', () => {
      const docs = [
        createDocsEntity('PRODUCT-AAA'),
        createDocsEntity('PRODUCT-zzz'),
      ];
      const action = DocsActions.loadDocsSuccess({ docs });

      const result: DocsState = docsReducer(initialDocsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = docsReducer(initialDocsState, action);

      expect(result).toBe(initialDocsState);
    });
  });
});
