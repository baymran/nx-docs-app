import { createAction, props } from '@ngrx/store';
import { DocsEntity } from './docs.models';

export const initDocs = createAction('[Docs Page] Init');

export const loadDocsSuccess = createAction(
  '[Docs/API] Load Docs Success',
  props<{ docs: DocsEntity[] }>()
);

export const loadDocsFailure = createAction(
  '[Docs/API] Load Docs Failure',
  props<{ error: any }>()
);
