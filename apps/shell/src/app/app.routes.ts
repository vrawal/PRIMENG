import { NxWelcome } from './nx-welcome';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'person',
    loadChildren: () => import('person/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'vehicle',
    loadChildren: () => import('vehicle/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'operation_names',
    loadChildren: () =>
      import('operation_names/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: '',
    component: NxWelcome,
  },
];
