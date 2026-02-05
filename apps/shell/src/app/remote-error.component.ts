import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule],
  selector: 'app-remote-error',
  template: `
    <div class="remote-error-container">
      <p-card>
        <ng-template pTemplate="header">
          <div class="error-header">
            <i class="pi pi-exclamation-triangle" style="font-size: 2rem; color: var(--orange-500);"></i>
          </div>
        </ng-template>
        <div class="error-content">
          <h2>Module Unavailable</h2>
          <p class="error-message">
            {{ errorMessage || 'The requested module could not be loaded. This may be due to a network issue or the module being temporarily unavailable.' }}
          </p>
          <div class="error-details" *ngIf="moduleName">
            <strong>Module:</strong> {{ moduleName }}
          </div>
        </div>
        <ng-template pTemplate="footer">
          <div class="error-actions">
            <p-button
              label="Retry"
              icon="pi pi-refresh"
              (onClick)="retry()"
              [loading]="retrying"
            ></p-button>
            <p-button
              label="Go to Dashboard"
              icon="pi pi-home"
              severity="secondary"
              (onClick)="goToDashboard()"
            ></p-button>
          </div>
        </ng-template>
      </p-card>
    </div>
  `,
  styles: [`
    .remote-error-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 50vh;
      padding: 2rem;
    }

    p-card {
      width: 100%;
      max-width: 600px;
    }

    .error-header {
      display: flex;
      justify-content: center;
      padding: 2rem 0 1rem 0;
    }

    .error-content {
      text-align: center;
      padding: 1rem 0;
    }

    .error-content h2 {
      margin: 0 0 1rem 0;
      color: var(--text-color);
    }

    .error-message {
      color: var(--text-color-secondary);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .error-details {
      background: var(--surface-50);
      padding: 1rem;
      border-radius: 6px;
      margin-top: 1rem;
      text-align: left;
    }

    .error-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
  `]
})
export class RemoteErrorComponent implements OnInit {
  errorMessage: string = '';
  moduleName: string = '';
  retrying = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.errorMessage = params['message'] || '';
      this.moduleName = params['module'] || '';
    });
  }

  async retry(): Promise<void> {
    if (this.retrying) return;

    this.retrying = true;
    try {
      // Navigate to the original route to trigger reload
      const currentPath = this.router.url.split('?')[0].replace('/error', '');
      if (currentPath) {
        await this.router.navigateByUrl('/', { skipLocationChange: true });
        await this.router.navigate([currentPath]);
      }
    } catch (error) {
      console.error('Retry navigation failed:', error);
    } finally {
      this.retrying = false;
    }
  }

  goToDashboard(): void {
    this.router.navigate(['/']);
  }
}
