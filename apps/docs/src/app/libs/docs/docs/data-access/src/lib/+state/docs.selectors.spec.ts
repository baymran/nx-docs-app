import { DocsEntity } from './docs.models';
import {
  docsAdapter,
  DocsPartialState,
  initialDocsState,
} from './docs.reducer';
import * as DocsSelectors from './docs.selectors';

describe('Docs Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getDocsId = (it: DocsEntity) => it.id;
  const createDocsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as DocsEntity);

  let state: DocsPartialState;

  beforeEach(() => {
    state = {
      docs: docsAdapter.setAll(
        [
          createDocsEntity('PRODUCT-AAA'),
          createDocsEntity('PRODUCT-BBB'),
          createDocsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialDocsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Docs Selectors', () => {
    it('selectAllDocs() should return the list of Docs', () => {
      const results = DocsSelectors.selectAllDocs(state);
      const selId = getDocsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = DocsSelectors.selectEntity(state) as DocsEntity;
      const selId = getDocsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectDocsLoaded() should return the current "loaded" status', () => {
      const result = DocsSelectors.selectDocsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectDocsError() should return the current "error" state', () => {
      const result = DocsSelectors.selectDocsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
