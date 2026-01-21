import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    CardModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    FormsModule,
    TableModule
  ],
  selector: 'app-dashboard',
  template: `
    <div class="welcome-banner">
      <h1>Welcome, {{userInfo.name}}</h1>
    </div>
    <div class="dashboard-container">
      <!-- Left Panel - Search -->
      <p-card header="Cross Domain Search" class="search-panel">
        <p-iconField iconPosition="right" class="search-field">
            <p-inputIcon styleClass="pi pi-search"></p-inputIcon>
            <input pInputText type="text" placeholder="Search across all domains" [(ngModel)]="searchQuery" style="width: 100%" />
        </p-iconField>

        <!-- Search Results Table -->
        <div class="search-results-table">
          <p-table [value]="cases" [rows]="5" [paginator]="true" class="p-datatable-sm">
            <ng-template pTemplate="header">
                <tr>
                    <th>Domain</th>
                    <th>Case Name</th>
                    <th>Team Leader</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-case>
                <tr>
                    <td>{{case.domain}}</td>
                    <td>{{case.caseNumber}}</td>
                    <td>{{case.teamLeader}}</td>
                </tr>
            </ng-template>
          </p-table>
        </div>
      </p-card>

      <!-- Right Panel - Shortcuts -->
      <p-card header="Quick Access" class="shortcuts-panel">
        <div class="shortcuts-grid">
          <!-- Person Shortcut -->
          <a class="shortcut-link" routerLink="/person">
            <i class="pi pi-user"></i>
            <span>Person</span>
          </a>

          <!-- Vehicle Shortcut -->
          <a class="shortcut-link" routerLink="/vehicle">
            <i class="pi pi-car"></i>
            <span>Vehicle</span>
          </a>

          <!-- Operation Names Shortcut -->
          <a class="shortcut-link" routerLink="/operation_names">
            <i class="pi pi-cog"></i>
            <span>Operation Names</span>
          </a>

          <!-- Clear Session Shortcut -->
          <a class="shortcut-link" routerLink="/clear_session">
            <i class="pi pi-times-circle"></i>
            <span>Clear Session</span>
          </a>
        </div>
      </p-card>
    </div>
  `,
  styles: [`
    .welcome-banner {
      background-color: var(--p-content-background);
      padding: 1rem 2rem;
      border-radius: 12px;
      margin-bottom: 24px;
      box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.08);
    }

    .welcome-banner h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      color: var(--p-primary-color);
    }

    .dashboard-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }

    .search-panel, .shortcuts-panel {
      height: 100%;
    }

    .search-field {
      width: 100%;
      margin-top: 8px;
    }

    .shortcuts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 16px;
    }

    .shortcut-link {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px;
      border-radius: 12px;
      background-color: var(--p-content-background);
      border: 1px solid var(--p-content-border-color);
      transition: all 0.2s;
      text-decoration: none;
      color: var(--p-text-color);
    }

    .shortcut-link:hover {
      background-color: var(--p-highlight-background);
      border-color: var(--p-primary-color);
      transform: translateY(-4px);
    }

    .shortcut-link i {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: var(--p-primary-color);
    }

    .shortcut-link span {
      font-size: 1rem;
      font-weight: 600;
    }

    .search-results-table {
      margin-top: 24px;
    }

    :host ::ng-deep .p-card {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    :host ::ng-deep .p-card-body {
        flex: 1;
    }

    @media (max-width: 1200px) {
        .dashboard-container {
            grid-template-columns: 1fr;
        }
    }
  `]
})
export class DashboardComponent {
  userInfo = {
    name: 'Vishal'
  };
  searchQuery = '';

  displayedColumns: string[] = ['domain', 'caseNumber', 'teamLeader'];

  cases = [
    { domain: 'ACT', caseNumber: '12345678', teamLeader: 'Sarah Johnson' },
    { domain: 'NAT', caseNumber: '23456789', teamLeader: 'Michael Chen' },
    { domain: 'AUP', caseNumber: '34567890', teamLeader: 'Emma Williams' },
    { domain: 'ACT', caseNumber: '45678901', teamLeader: 'David Thompson' },
    { domain: 'NAT', caseNumber: '56789012', teamLeader: 'Lisa Anderson' },
    { domain: 'NAT', caseNumber: '67890123', teamLeader: 'James Wilson' },
    { domain: 'AUP', caseNumber: '78901234', teamLeader: 'Rachel Martinez' },
    { domain: 'ACT', caseNumber: '89012345', teamLeader: 'Thomas Brown' },
    { domain: 'NAT', caseNumber: '90123456', teamLeader: 'Jessica Lee' },
    { domain: 'ACT', caseNumber: '01234567', teamLeader: 'Robert Taylor' }
  ];
}
