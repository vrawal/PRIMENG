import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

/**
 * Custom preloading strategy that attempts to preload remote modules
 * but gracefully handles failures without blocking navigation
 */
@Injectable({
  providedIn: 'root',
})
export class SafePreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Check if route should be preloaded
    if (route.data && route.data['preload']) {
      const delay = route.data['preloadDelay'] || 0;

      console.log(
        `Preloading route ${route.path || 'unknown'}${delay ? ` after ${delay}ms` : ''}...`
      );

      return timer(delay).pipe(
        mergeMap(() =>
          load().pipe(
            catchError((error) => {
              console.warn(
                `Failed to preload route ${route.path || 'unknown'}:`,
                error.message
              );
              // Return empty observable to continue without blocking
              return of(null);
            })
          )
        )
      );
    }

    // Don't preload if not configured
    return of(null);
  }
}
