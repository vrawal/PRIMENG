import {
  ApplicationConfig,
  ErrorHandler,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { appRoutes } from './app.routes';

import { providePrimeNG } from 'primeng/config';
import { GlobalErrorHandler } from './global-error.handler';
import { SafePreloadingStrategy } from './utils/safe-preloading.strategy';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import { MessageService } from 'primeng/api';

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{orange.50}',
            100: '{orange.100}',
            200: '{orange.200}',
            300: '{orange.300}',
            400: '{orange.400}',
            500: '{orange.500}',
            600: '{orange.600}',
            700: '{orange.700}',
            800: '{orange.800}',
            900: '{orange.900}',
            950: '{orange.950}'
        }
    }
});

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withPreloading(SafePreloadingStrategy)),
    provideAnimations(),
    provideHttpClient(),
    MessageService,
    providePrimeNG({
        theme: {
            preset: MyPreset,
            options: {
                darkModeSelector: '.my-app-dark'
            }
        }
    })
  ],
};
