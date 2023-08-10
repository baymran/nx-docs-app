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
    children: [
      {
        path: ':id',
        // loadComponent: () => import('@docs/feature-docs-composer').then(c => c.FFF)
      }
    ]
  }
];
