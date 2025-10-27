import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    FormsModule,
    MatTableModule
  ],
  selector: 'app-dashboard',
  template: `
    <div class="welcome-banner">
      <h1>Welcome, {{userInfo.name}}</h1>
    </div>
    <div class="dashboard-container">
      <!-- Left Panel - Search -->
      <mat-card class="search-panel">
        <mat-card-header>
          <mat-card-title>Cross Domain Search</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Search across all domains</mat-label>
            <input matInput placeholder="Enter search terms" [(ngModel)]="searchQuery">
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>

          <!-- Search Results Table -->
          <div class="search-results-table">
            <table mat-table [dataSource]="cases" class="mat-elevation-z1">
              <!-- Domain Column -->
              <ng-container matColumnDef="domain">
                <th mat-header-cell *matHeaderCellDef>Domain</th>
                <td mat-cell *matCellDef="let case">{{case.domain}}</td>
              </ng-container>

              <!-- Case Number Column -->
              <ng-container matColumnDef="caseNumber">
                <th mat-header-cell *matHeaderCellDef>Case Name</th>
                <td mat-cell *matCellDef="let case">{{case.caseNumber}}</td>
              </ng-container>

              <!-- Team Leader Column -->
              <ng-container matColumnDef="teamLeader">
                <th mat-header-cell *matHeaderCellDef>Team Leader</th>
                <td mat-cell *matCellDef="let case">{{case.teamLeader}}</td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Right Panel - Shortcuts -->
      <mat-card class="shortcuts-panel">
        <mat-card-header>
          <mat-card-title>Quick Access</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="shortcuts-grid">
            <!-- Person Shortcut -->
            <a class="shortcut-link" routerLink="/person">
              <mat-icon>person</mat-icon>
              <span>Person</span>
            </a>

            <!-- Vehicle Shortcut -->
            <a class="shortcut-link" routerLink="/vehicle">
              <mat-icon>directions_car</mat-icon>
              <span>Vehicle</span>
            </a>

            <!-- Operation Names Shortcut -->
            <a class="shortcut-link" routerLink="/operation_names">
              <mat-icon>settings</mat-icon>
              <span>Operation Names</span>
            </a>

            <!-- Clear Session Shortcut -->
            <a class="shortcut-link" routerLink="/clear_session">
              <mat-icon>clear</mat-icon>
              <span>Clear Session</span>
            </a>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .welcome-banner {
      background-color: #f5f5f5;
    }

    .dark-theme .welcome-banner {
      background-color: rgba(255, 255, 255, 0.08);
    }

    .welcome-banner h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 400;
      color: inherit;
    }

    .dashboard-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 24px;
      height: calc(100vh - 64px - 48px); /* Viewport height minus toolbar and padding */
    }

    .search-panel, .shortcuts-panel {
      height: 100%;
    }

    .search-field {
      width: 100%;
      margin-top: 16px;
    }

    .shortcuts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
      padding: 16px 0;
    }

    .shortcut-link {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px;
      border-radius: 8px;
      background-color: rgba(0, 0, 0, 0.04);
      transition: all 0.3s ease;
      text-decoration: none;
      color: inherit;
    }

    .dark-theme .shortcut-link {
      background-color: rgba(255, 255, 255, 0.08);
    }

    .shortcut-link:hover {
      background-color: rgba(0, 0, 0, 0.08);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .dark-theme .shortcut-link:hover {
      background-color: rgba(255, 255, 255, 0.12);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    .shortcut-link mat-icon {
      font-size: 32px;
      height: 32px;
      width: 32px;
      margin-bottom: 8px;
    }

    .shortcut-link span {
      font-size: 16px;
    }

    mat-card-header {
      margin-bottom: 16px;
    }

    mat-card-title {
      font-size: 20px;
      font-weight: 500;
    }

    .search-results-table {
      margin-top: 24px;
      width: 100%;
      overflow: auto;
    }

    .search-results-table table {
      width: 100%;
    }

    .mat-mdc-row:nth-child(even) {
      background-color: rgba(0, 0, 0, 0.02);
    }

    .dark-theme .mat-mdc-row:nth-child(even) {
      background-color: rgba(255, 255, 255, 0.04);
    }

    .mat-mdc-row:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .dark-theme .mat-mdc-row:hover {
      background-color: rgba(255, 255, 255, 0.08);
    }

    th.mat-mdc-header-cell {
      font-weight: 600;
      color: inherit;
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
