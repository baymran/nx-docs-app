import { createAction, props } from '@ngrx/store';
import {DocumentEntity} from "@core/data-access";

export const initDocs = createAction('[Docs Page] Init');

export const loadDocsSuccess = createAction(
  '[Docs/API] Load Docs Success',
  props<{ docs: DocumentEntity[] }>()
);

export const loadDocsFailure = createAction(
  '[Docs/API] Load Docs Failure',
  props<{ error: any }>()
);
