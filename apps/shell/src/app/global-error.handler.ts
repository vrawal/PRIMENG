import { ErrorHandler, Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private messageService = inject(MessageService);
  private router = inject(Router);

  handleError(error: unknown): void {
    const message = this.getErrorMessage(error);
    const detail = this.getErrorDetail(error);

    console.error('GlobalErrorHandler:', message, error);

    // Check if this is a module loading error
    if (this.isModuleLoadingError(error)) {
      this.handleModuleLoadingError(error, message);
      return;
    }

    // Handle other errors
    this.messageService.add({
      severity: 'error',
      summary: 'Something went wrong',
      detail: message,
      life: 8000,
    });

    if (detail && this.isDevMode()) {
      console.error('Error details:', detail);
    }
  }

  private isModuleLoadingError(error: unknown): boolean {
    if (error instanceof Error) {
      const message = error.message.toLowerCase();
      return (
        message.includes('failed to load') ||
        message.includes('failed to fetch') ||
        message.includes('module') ||
        message.includes('cannot find module') ||
        message.includes('remote entry') ||
        (error as any).type === 'ChunkLoadError'
      );
    }
    return false;
  }

  private handleModuleLoadingError(error: unknown, message: string): void {
    console.error('Module loading error detected:', error);

    // Extract module name if possible
    let moduleName = 'Unknown module';
    if (error instanceof Error) {
      const match = error.message.match(/['"]([^'"]+)['"]/);
      if (match) {
        moduleName = match[1];
      }
    }

    this.messageService.add({
      severity: 'warn',
      summary: 'Module Loading Issue',
      detail: `Failed to load module. The application will attempt to recover.`,
      life: 6000,
    });

    // Navigate to error page with details
    this.router.navigate(['/error'], {
      queryParams: {
        message: message,
        module: moduleName,
      },
    });
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'An unexpected error occurred. Please try again.';
  }

  private getErrorDetail(error: unknown): string | undefined {
    if (error instanceof Error && error.stack) {
      return error.stack;
    }
    return undefined;
  }

  private isDevMode(): boolean {
    return typeof ngDevMode !== 'undefined' && ngDevMode;
  }
}
