import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const appRoutes: Route[] = [
  {
    path: 'clear_session',
    loadChildren: () =>
      import('clear_session/Routes').then((m) => m!.remoteRoutes),
  },
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
    component: DashboardComponent,
  },
];
