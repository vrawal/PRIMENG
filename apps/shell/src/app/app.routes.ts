import { inject, Route } from '@angular/router';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DashboardComponent } from './dashboard.component';
import { RemoteErrorComponent } from './remote-error.component';
import { wrapRemoteLoader } from './utils/remote-loader.util';

export const appRoutes: Route[] = [
  {
    path: 'clear_session',
    loadChildren: () =>
      wrapRemoteLoader(
        'clear_session',
        () => import('clear_session/Routes').then((m) => m!.remoteRoutes),
        inject(MessageService)
      )(),
    canMatch: [
      () => {
        return true;
      },
    ],
  },
  {
    path: 'person',
    loadChildren: () =>
      wrapRemoteLoader(
        'person',
        () => import('person/Routes').then((m) => m!.remoteRoutes),
        inject(MessageService)
      )(),
  },
  {
    path: 'vehicle',
    loadChildren: () =>
      wrapRemoteLoader(
        'vehicle',
        () => import('vehicle/Routes').then((m) => m!.remoteRoutes),
        inject(MessageService)
      )(),
  },
  {
    path: 'operation_names',
    loadChildren: () =>
      wrapRemoteLoader(
        'operation_names',
        () => import('operation_names/Routes').then((m) => m!.remoteRoutes),
        inject(MessageService)
      )(),
  },
  {
    path: 'error',
    component: RemoteErrorComponent,
  },
  {
    path: '',
    component: DashboardComponent,
  },
];
