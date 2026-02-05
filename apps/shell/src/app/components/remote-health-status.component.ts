import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { RemoteHealthService, RemoteStatus } from '../services/remote-health.service';

@Component({
  standalone: true,
  imports: [CommonModule, CardModule, TagModule, ButtonModule],
  selector: 'app-remote-health-status',
  template: `
    <p-card *ngIf="showStatus" class="health-status-card">
      <ng-template pTemplate="header">
        <div class="status-header">
          <h3>Remote Modules Status</h3>
          <p-button
            icon="pi pi-times"
            [text]="true"
            [rounded]="true"
            severity="secondary"
            (onClick)="hideStatus()"
          ></p-button>
        </div>
      </ng-template>
      <div class="status-list">
        <div
          *ngFor="let status of remoteStatuses"
          class="status-item"
        >
          <div class="status-info">
            <span class="module-name">{{ status.name }}</span>
            <p-tag
              [value]="status.available ? 'Available' : 'Unavailable'"
              [severity]="status.available ? 'success' : 'danger'"
            ></p-tag>
          </div>
          <div class="status-details">
            <small>
              Last checked: {{ status.lastChecked | date: 'short' }}
              <span *ngIf="status.failureCount > 0">
                | Failures: {{ status.failureCount }}
              </span>
            </small>
          </div>
        </div>
      </div>
      <ng-template pTemplate="footer">
        <p-button
          label="Refresh Status"
          icon="pi pi-refresh"
          severity="secondary"
          size="small"
          (onClick)="refreshStatus()"
        ></p-button>
      </ng-template>
    </p-card>
  `,
  styles: [`
    .health-status-card {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 400px;
      max-width: 90vw;
      z-index: 1000;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }

    .status-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
    }

    .status-header h3 {
      margin: 0;
      font-size: 1.1rem;
    }

    .status-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .status-item {
      padding: 0.75rem;
      border: 1px solid var(--surface-200);
      border-radius: 6px;
      background: var(--surface-50);
    }

    .status-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .module-name {
      font-weight: 600;
      color: var(--text-color);
    }

    .status-details {
      color: var(--text-color-secondary);
      font-size: 0.85rem;
    }
  `]
})
export class RemoteHealthStatusComponent implements OnInit, OnDestroy {
  remoteStatuses: RemoteStatus[] = [];
  showStatus = false;
  private subscription?: Subscription;

  constructor(private healthService: RemoteHealthService) {}

  ngOnInit(): void {
    // Listen to keyboard shortcut to toggle display (Ctrl/Cmd + Shift + H)
    window.addEventListener('keydown', this.handleKeyboard);

    this.subscription = this.healthService.status$.subscribe(statusMap => {
      this.remoteStatuses = Array.from(statusMap.values());
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.handleKeyboard);
    this.subscription?.unsubscribe();
  }

  private handleKeyboard = (event: KeyboardEvent): void => {
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'H') {
      event.preventDefault();
      this.toggleStatus();
    }
  };

  toggleStatus(): void {
    this.showStatus = !this.showStatus;
  }

  hideStatus(): void {
    this.showStatus = false;
  }

  refreshStatus(): void {
    this.remoteStatuses = Array.from(this.healthService.getAllStatuses().values());
  }
}
