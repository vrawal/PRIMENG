import { ErrorHandler, Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private messageService = inject(MessageService);

  handleError(error: unknown): void {
    const message = this.getErrorMessage(error);
    const detail = this.getErrorDetail(error);

    console.error('GlobalErrorHandler:', message, error);

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
