import {Route} from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'documents',
    pathMatch: 'full',
  },
  {
    path: 'documents',
    loadComponent: () => import('@docs/feature-docs-list').then(c => c.DocsTableContainerComponent),
  },
  {
    path: 'documents/:id',
    loadComponent: () => import('@docs/feature-docs-editor').then(c => c.DocsDetailContainerComponent)
  }
];
