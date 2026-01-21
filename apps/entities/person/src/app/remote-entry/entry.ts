import { Component } from '@angular/core';
import { NxWelcome } from './nx-welcome';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  standalone: true,
  imports: [NxWelcome, ButtonModule, CardModule],
  selector: 'app-person-entry',
  template: `
    <div class="card">
        <p-card header="Person Module">
            <p class="m-0">
                This is the person module content.
            </p>
            <ng-template pTemplate="footer">
                <p-button label="Action" icon="pi pi-check"></p-button>
            </ng-template>
        </p-card>
    </div>
    <app-nx-welcome></app-nx-welcome>
  `,
  styles: [`
    :host {
      display: block;
    }
    .card {
        margin-bottom: 2rem;
    }
  `]
})
export class RemoteEntry {}
