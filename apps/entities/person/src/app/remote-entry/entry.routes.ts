import { Route } from '@angular/router';
import { RemoteEntry } from './entry';
import { PersonListComponent } from '../components/person-list.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteEntry,
  },
  {
    path: 'list',
    component: PersonListComponent,
  },
];
