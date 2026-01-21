import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ButtonModule,
    ToastModule
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'shell';
  isDarkTheme = false;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    const element = document.querySelector('html');
    if (element) {
        if (this.isDarkTheme) {
            element.classList.add('my-app-dark');
        } else {
            element.classList.remove('my-app-dark');
        }
    }
  }
}
