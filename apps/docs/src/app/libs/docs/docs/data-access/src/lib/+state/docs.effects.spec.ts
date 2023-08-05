import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as DocsActions from './docs.actions';
import { DocsEffects } from './docs.effects';

describe('DocsEffects', () => {
  let actions: Observable<Action>;
  let effects: DocsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        DocsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(DocsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: DocsActions.initDocs() });

      const expected = hot('-a-|', {
        a: DocsActions.loadDocsSuccess({ docs: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
