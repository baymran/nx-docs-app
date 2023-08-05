import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as DocsActions from './docs.actions';
import { DocsEffects } from './docs.effects';
import { DocsFacade } from './docs.facade';
import { DocsEntity } from './docs.models';
import {
  DOCS_FEATURE_KEY,
  DocsState,
  initialDocsState,
  docsReducer,
} from './docs.reducer';
import * as DocsSelectors from './docs.selectors';

interface TestSchema {
  docs: DocsState;
}

describe('DocsFacade', () => {
  let facade: DocsFacade;
  let store: Store<TestSchema>;
  const createDocsEntity = (id: string, name = ''): DocsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(DOCS_FEATURE_KEY, docsReducer),
          EffectsModule.forFeature([DocsEffects]),
        ],
        providers: [DocsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(DocsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allDocs$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allDocs$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadDocsSuccess` to manually update list
     */
    it('allDocs$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allDocs$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        DocsActions.loadDocsSuccess({
          docs: [createDocsEntity('AAA'), createDocsEntity('BBB')],
        })
      );

      list = await readFirst(facade.allDocs$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
