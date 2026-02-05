import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RemoteHealthService } from '../services/remote-health.service';

export interface RemoteLoadOptions {
  remoteName: string;
  maxRetries?: number;
  retryDelay?: number;
  messageService?: MessageService;
  healthService?: RemoteHealthService;
}

export interface RemoteLoadResult<T> {
  success: boolean;
  data?: T;
  error?: Error;
}

/**
 * Safely loads a remote module with retry logic and error handling
 * @param loadFn The function that loads the remote module
 * @param options Configuration for retry and error handling
 */
export async function loadRemoteWithRetry<T>(
  loadFn: () => Promise<T>,
  options: RemoteLoadOptions
): Promise<RemoteLoadResult<T>> {
  const {
    remoteName,
    maxRetries = 2,
    retryDelay = 1000,
    messageService,
    healthService,
  } = options;

  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      console.log(
        `Loading remote '${remoteName}'${attempt > 0 ? ` (attempt ${attempt + 1}/${maxRetries + 1})` : ''}...`
      );

      const data = await loadFn();

      if (attempt > 0) {
        console.log(`Successfully loaded remote '${remoteName}' after ${attempt} retries`);
      }

      // Record success
      if (healthService) {
        healthService.recordSuccess(remoteName);
      }

      return { success: true, data };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      console.error(
        `Failed to load remote '${remoteName}' (attempt ${attempt + 1}/${maxRetries + 1}):`,
        lastError.message
      );

      // Don't retry on the last attempt
      if (attempt < maxRetries) {
        await delay(retryDelay * (attempt + 1)); // Exponential backoff
      }
    }
  }

  // All retries failed - record failure
  if (healthService) {
    healthService.recordFailure(remoteName);
  }

  const errorMessage = `Failed to load module '${remoteName}' after ${maxRetries + 1} attempts`;
  console.error(errorMessage, lastError);

  if (messageService) {
    messageService.add({
      severity: 'error',
      summary: 'Module Load Failed',
      detail: `Unable to load ${remoteName} module. Please check your connection and try again.`,
      life: 8000,
    });
  }

  const finalError = new Error(errorMessage);
  // Attach cause if supported
  if (lastError) {
    (finalError as any).cause = lastError;
  }

  return {
    success: false,
    error: finalError,
  };
}

/**
 * Wraps a remote route loader with error handling
 * Uses Angular's inject() to get services within the context
 */
export function wrapRemoteLoader<T>(
  remoteName: string,
  loader: () => Promise<T>,
  messageService?: MessageService
) {
  return async (): Promise<T> => {
    // Get health service if available
    let healthService: RemoteHealthService | undefined;
    try {
      healthService = inject(RemoteHealthService);
    } catch {
      // Service not available in current context
    }

    const result = await loadRemoteWithRetry(loader, {
      remoteName,
      maxRetries: 2,
      retryDelay: 1000,
      messageService,
      healthService,
    });

    if (result.success && result.data) {
      return result.data;
    }

    // Return empty routes or throw to trigger fallback
    throw result.error || new Error(`Failed to load ${remoteName}`);
  };
}

/**
 * Utility function to delay execution
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
