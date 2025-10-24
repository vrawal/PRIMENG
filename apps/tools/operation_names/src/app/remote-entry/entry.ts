import { Component } from '@angular/core';
import { NxWelcome } from './nx-welcome';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  standalone: true,
  imports: [NxWelcome, MatButtonModule, MatToolbarModule],
  selector: 'app-operation-names-entry',
  template: `
    <mat-toolbar color="primary">
      <span>Operation Names Module</span>
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
