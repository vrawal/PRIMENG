import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { FluidModule } from 'primeng/fluid';
import { InputNumberModule } from 'primeng/inputnumber';
import { Textarea as InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TreeModule } from 'primeng/tree';
import { ListboxModule } from 'primeng/listbox';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { TimelineModule } from 'primeng/timeline';
import { BadgeModule } from 'primeng/badge';
import { ProgressBarModule } from 'primeng/progressbar';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { TreeNode, MessageService } from 'primeng/api';

@Component({
  standalone: true,
  providers: [MessageService],
  imports: [
    RouterModule,
    CommonModule,
    CardModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    FormsModule,
    TableModule,
    FluidModule,
    InputNumberModule,
    InputTextareaModule,
    CheckboxModule,
    RadioButtonModule,
    SelectModule,
    DatePickerModule,
    TreeModule,
    ListboxModule,
    MessageModule,
    MessagesModule,
    TimelineModule,
    BadgeModule,
    ProgressBarModule,
    SkeletonModule,
    ToastModule
  ],
  selector: 'app-dashboard',
  template: `
    <div class="welcome-banner">
      <h1>Welcome, {{userInfo.name}}</h1>
    </div>

    <div class="dashboard-grid">
      <!-- Row 1: Original Search and Quick Access -->
      <div class="grid-row">
        <p-card header="Cross Domain Search" class="h-full">
          <p-iconField iconPosition="right" class="search-field">
              <p-inputIcon styleClass="pi pi-search"></p-inputIcon>
              <input pInputText type="text" placeholder="Search across all domains" [(ngModel)]="searchQuery" style="width: 100%" />
          </p-iconField>

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

        <p-card header="Quick Access" class="h-full">
          <div class="shortcuts-grid">
            <a class="shortcut-link" routerLink="/person">
              <i class="pi pi-user"></i>
              <span>Person</span>
            </a>
            <a class="shortcut-link" routerLink="/vehicle">
              <i class="pi pi-car"></i>
              <span>Vehicle</span>
            </a>
            <a class="shortcut-link" routerLink="/operation_names">
              <i class="pi pi-cog"></i>
              <span>Operation Names</span>
            </a>
            <a class="shortcut-link" routerLink="/clear_session">
              <i class="pi pi-times-circle"></i>
              <span>Clear Session</span>
            </a>
          </div>
        </p-card>
      </div>

      <!-- Row 2: Form Layout and Inputs -->
      <div class="grid-row">
        <p-card header="Form Layout (Fluid)" class="h-full">
          <p-fluid>
            <div class="field">
              <label for="name1">Name</label>
              <input pInputText id="name1" type="text" />
            </div>
            <div class="field">
              <label for="email1">Email</label>
              <input pInputText id="email1" type="text" />
            </div>
            <div class="field">
              <label for="age1">Age</label>
              <p-inputNumber id="age1"></p-inputNumber>
            </div>
            <p-button label="Submit" class="mt-2"></p-button>
          </p-fluid>
        </p-card>

        <p-card header="Input Examples" class="h-full">
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-2">
              <p-checkbox [(ngModel)]="checked" [binary]="true" inputId="binary"></p-checkbox>
              <label for="binary">Remember Me</label>
            </div>
            <div class="flex flex-wrap gap-4">
              <div class="flex items-center gap-2">
                <p-radioButton name="pizza" value="Cheese" [(ngModel)]="ingredient" inputId="ingredient1"></p-radioButton>
                <label for="ingredient1">Cheese</label>
              </div>
              <div class="flex items-center gap-2">
                <p-radioButton name="pizza" value="Mushroom" [(ngModel)]="ingredient" inputId="ingredient2"></p-radioButton>
                <label for="ingredient2">Mushroom</label>
              </div>
            </div>
            <p-select [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" placeholder="Select a City" class="w-full"></p-select>
            <p-datePicker [(ngModel)]="date" class="w-full" placeholder="Pick a Date"></p-datePicker>
            <textarea pInputTextarea rows="3" placeholder="Your Message" class="w-full"></textarea>
          </div>
        </p-card>
      </div>

      <!-- Row 3: Buttons and Lists -->
      <div class="grid-row">
        <p-card header="Button Examples" class="h-full">
          <div class="flex flex-wrap gap-2">
            <p-button label="Primary"></p-button>
            <p-button label="Secondary" severity="secondary"></p-button>
            <p-button label="Success" severity="success"></p-button>
            <p-button label="Info" severity="info"></p-button>
            <p-button label="Warn" severity="warn"></p-button>
            <p-button label="Help" severity="help"></p-button>
            <p-button label="Danger" severity="danger"></p-button>
            <p-button label="Contrast" severity="contrast"></p-button>
          </div>
          <div class="flex flex-wrap gap-2 mt-4">
            <p-button label="Outlined" [outlined]="true"></p-button>
            <p-button label="Text" [text]="true"></p-button>
            <p-button icon="pi pi-check" [rounded]="true"></p-button>
            <p-button icon="pi pi-search" [rounded]="true" severity="secondary"></p-button>
          </div>
        </p-card>

        <p-card header="List Examples" class="h-full">
           <p-listbox [options]="cities" [(ngModel)]="selectedCities" optionLabel="name" [multiple]="true" [checkbox]="true" [filter]="true" [listStyle]="{'max-height': '200px'}"></p-listbox>
        </p-card>
      </div>

      <!-- Row 4: Tree and Timeline -->
      <div class="grid-row">
        <p-card header="Tree Example" class="h-full">
          <p-tree [value]="files" class="w-full" styleClass="border-none"></p-tree>
        </p-card>

        <p-card header="Seizure timeline" class="h-full">
          <p-timeline [value]="events">
            <ng-template pTemplate="content" let-event>
              {{event.status}}
            </ng-template>
            <ng-template pTemplate="opposite" let-event>
              <small class="text-color-secondary">{{event.date}}</small>
            </ng-template>
          </p-timeline>
        </p-card>
      </div>

      <!-- Row 5: Messages and Misc -->
      <div class="grid-row">
        <p-card header="Message Examples" class="h-full">
          <div class="flex flex-col gap-2">
            <p-button label="Show Toast" (click)="showToast()" severity="warn" class="mb-2"></p-button>
            <p-message severity="success" text="Message Content">Success Message</p-message>
            <p-message severity="info" text="Message Content">Info Message</p-message>
            <p-message severity="warn" text="Message Content">Warning Message</p-message>
            <p-message severity="error" text="Message Content">Error Message</p-message>
          </div>
          <div class="mt-4">
            <p-messages [(value)]="msgs"></p-messages>
          </div>
        </p-card>

        <p-card header="Misc Examples" class="h-full">
          <div class="flex flex-col gap-4">
             <div class="flex gap-2">
                <p-badge [value]="'2'" severity="success"></p-badge>
                <p-badge [value]="'8'" severity="info"></p-badge>
                <p-badge [value]="'12'" severity="warn"></p-badge>
                <p-badge [value]="'5'" severity="danger"></p-badge>
             </div>
             <div>
                <p-progressBar [value]="50" [style]="{'height': '6px'}"></p-progressBar>
             </div>
             <div class="flex flex-col gap-2">
                <p-skeleton width="10rem" height="2rem"></p-skeleton>
                <p-skeleton width="5rem" height="1rem"></p-skeleton>
                <p-skeleton shape="circle" size="3rem"></p-skeleton>
             </div>
          </div>
        </p-card>
      </div>
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

    .dashboard-grid {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .grid-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
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

    .field {
      margin-bottom: 1rem;
    }

    .field label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .h-full {
      height: 100%;
    }

    .mt-2 { margin-top: 0.5rem; }
    .mt-4 { margin-top: 1rem; }
    .flex { display: flex; }
    .flex-col { flex-direction: column; }
    .flex-wrap { flex-wrap: wrap; }
    .items-center { align-items: center; }
    .gap-2 { gap: 0.5rem; }
    .gap-4 { gap: 1rem; }
    .w-full { width: 100%; }

    :host ::ng-deep .p-card {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    :host ::ng-deep .p-card-body {
        flex: 1;
    }

    @media (max-width: 1200px) {
        .grid-row {
            grid-template-columns: 1fr;
        }
    }
  `]
})
export class DashboardComponent implements OnInit {
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

  // Example Data
  checked = false;
  ingredient = '';
  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];
  selectedCity: any;
  selectedCities: any[] = [];
  date: Date | undefined;

  files: TreeNode[] = [
    {
      label: 'Documents',
      data: 'Documents Folder',
      expandedIcon: 'pi pi-folder-open',
      collapsedIcon: 'pi pi-folder',
      children: [
        {
          label: 'Work',
          data: 'Work Folder',
          expandedIcon: 'pi pi-folder-open',
          collapsedIcon: 'pi pi-folder',
          children: [
            { label: 'Expenses.doc', icon: 'pi pi-file', data: 'Expenses Document' },
            { label: 'Resume.doc', icon: 'pi pi-file', data: 'Resume Document' }
          ]
        },
        {
          label: 'Home',
          data: 'Home Folder',
          expandedIcon: 'pi pi-folder-open',
          collapsedIcon: 'pi pi-folder',
          children: [{ label: 'Invoices.txt', icon: 'pi pi-file', data: 'Invoices for bundle' }]
        }
      ]
    },
    {
      label: 'Pictures',
      data: 'Pictures Folder',
      expandedIcon: 'pi pi-folder-open',
      collapsedIcon: 'pi pi-folder',
      children: [
        { label: 'barcelona.jpg', icon: 'pi pi-image', data: 'Barcelona Photo' },
        { label: 'logo.jpg', icon: 'pi pi-image', data: 'Logo Photo' },
        { label: 'primeui.png', icon: 'pi pi-image', data: 'PrimeUI Photo' }
      ]
    }
  ];

  events = [
    { status: 'Seizure created (Vishal)', date: '23/12/2025 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
    { status: 'Item added (Ben)', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
    { status: 'Reviewed (Dan)', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
    { status: 'Finalised (Viv)', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
  ];

  msgs = [
    { severity: 'info', summary: 'Info', detail: 'Message Content' },
    { severity: 'success', summary: 'Success', detail: 'Message Content' }
  ];

  constructor(private messageService: MessageService) {}

  showToast() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Toast message from Dashboard!' });
  }

  ngOnInit() {}
}
