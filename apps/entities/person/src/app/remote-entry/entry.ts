import { Component } from '@angular/core';
import { NxWelcome } from './nx-welcome';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  standalone: true,
  imports: [NxWelcome, MatButtonModule, MatToolbarModule],
  selector: 'app-person-entry',
  template: `
    <mat-toolbar color="primary">
      <span>Person Module</span>
    </mat-toolbar>
    <app-nx-welcome></app-nx-welcome>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class RemoteEntry {}
