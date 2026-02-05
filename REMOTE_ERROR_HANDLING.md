# Remote Module Loading Error Handling

This document describes the graceful error handling implementation for Module Federation remote modules in the shell application.

## Overview

The application now includes comprehensive error handling for remote module loading failures, ensuring a better user experience when:
- Remote modules are unavailable
- Network issues prevent module loading
- Remote entry points fail to load
- Module initialization errors occur

## Features

### 1. Automatic Retry Logic
Remote modules are automatically retried with exponential backoff:
- **Default retries**: 2 attempts (3 total tries)
- **Exponential backoff**: Increasing delay between retries (1s, 2s, etc.)
- **Smart failure handling**: Distinguishes between transient and permanent failures

### 2. User-Friendly Error Messages
- Toast notifications inform users of loading issues
- Dedicated error page with retry options
- Clear messaging about what went wrong

### 3. Remote Health Monitoring
- Tracks the status of all remote modules
- Records success/failure counts
- Provides visibility into remote availability
- Debug panel accessible via `Ctrl/Cmd + Shift + H`

### 4. Graceful Degradation
- Application continues to function even if some remotes fail
- Navigation to other modules remains functional
- Users can retry failed modules without reloading the entire app

### 5. Safe Preloading Strategy
- Attempts to preload remote modules in the background
- Failures don't block navigation or app startup
- Configurable per route

## Components

### Remote Loader Utility
**File**: `apps/shell/src/app/utils/remote-loader.util.ts`

Provides functions to safely load remote modules with retry logic:

```typescript
// Wrap any remote import with error handling
wrapRemoteLoader('moduleName', () => import('module/Routes'))
```

### Remote Error Component
**File**: `apps/shell/src/app/remote-error.component.ts`

Displays a user-friendly error page when remote loading fails:
- Shows error details
- Provides retry functionality
- Allows navigation back to dashboard

### Global Error Handler
**File**: `apps/shell/src/app/global-error.handler.ts`

Enhanced to detect and handle module loading errors specifically:
- Identifies module loading errors
- Routes users to error page with context
- Shows appropriate toast messages

### Remote Health Service
**File**: `apps/shell/src/app/services/remote-health.service.ts`

Monitors the health status of all remote modules:
- Tracks availability
- Records failure counts
- Provides observable status updates

```typescript
// Inject the service to check remote status
constructor(private healthService: RemoteHealthService) {}

// Check if a remote is available
const isAvailable = this.healthService.isRemoteAvailable('person');
```

### Health Status Component
**File**: `apps/shell/src/app/components/remote-health-status.component.ts`

Debug panel showing real-time remote module status:
- Toggle visibility with `Ctrl/Cmd + Shift + H`
- View all remote module statuses
- See last check time and failure counts

### Safe Preloading Strategy
**File**: `apps/shell/src/app/utils/safe-preloading.strategy.ts`

Preloads remote modules without blocking navigation if they fail.

## Usage

### Basic Route Configuration
Routes are automatically wrapped with error handling:

```typescript
{
  path: 'person',
  loadChildren: () =>
    wrapRemoteLoader(
      'person',
      () => import('person/Routes').then((m) => m!.remoteRoutes),
      inject(MessageService)
    )(),
}
```

### Enable Preloading (Optional)
Add `preload` flag to route data:

```typescript
{
  path: 'vehicle',
  data: { 
    preload: true,
    preloadDelay: 2000  // Optional delay in ms
  },
  loadChildren: () => wrapRemoteLoader(...)()
}
```

### Monitor Remote Health
Toggle the debug panel with `Ctrl/Cmd + Shift + H` to see:
- Which remotes are currently available
- When each remote was last checked
- Failure counts for each remote

### Programmatic Health Checks
```typescript
import { RemoteHealthService } from './services/remote-health.service';

constructor(private healthService: RemoteHealthService) {}

// Check specific remote
const status = this.healthService.getRemoteStatus('person');
console.log(`Person module available: ${status?.available}`);

// Subscribe to status changes
this.healthService.status$.subscribe(statusMap => {
  statusMap.forEach((status, name) => {
    console.log(`${name}: ${status.available ? 'UP' : 'DOWN'}`);
  });
});
```

## Configuration

### Adjust Retry Settings
Modify defaults in `remote-loader.util.ts`:

```typescript
export async function loadRemoteWithRetry<T>(
  loadFn: () => Promise<T>,
  options: RemoteLoadOptions
): Promise<RemoteLoadResult<T>> {
  const {
    remoteName,
    maxRetries = 3,        // Change default retries
    retryDelay = 1500,     // Change base delay
    // ...
  } = options;
```

### Customize Error Messages
Edit `remote-error.component.ts` to modify the error page appearance and messaging.

### Add/Remove Monitored Remotes
Update the remote list in `remote-health.service.ts`:

```typescript
private remotes = ['clear_session', 'person', 'vehicle', 'operation_names'];
```

## Error Scenarios Handled

1. **Network Failures**: Temporary connectivity issues
2. **Module Not Found**: Remote bundle unavailable
3. **Initialization Errors**: Remote module fails to initialize
4. **Timeout Errors**: Remote takes too long to load
5. **CORS Issues**: Cross-origin restrictions
6. **Version Mismatches**: Incompatible remote versions

## Testing Error Handling

### Simulate Remote Failure
1. Stop one of the remote servers (e.g., `person`)
2. Navigate to `/person` in the shell application
3. Observe:
   - Loading attempts with retries
   - Toast notification of failure
   - Error page with retry option
   - Health status panel shows module as unavailable

### Test Retry Mechanism
1. Navigate to a module while its server is down
2. Start the remote server
3. Click "Retry" on the error page
4. Module should load successfully

### View Health Status
1. Press `Ctrl/Cmd + Shift + H`
2. Health status panel appears in bottom-right
3. Shows status of all remote modules
4. Updates in real-time as modules are accessed

## Best Practices

1. **Always use `wrapRemoteLoader`** for remote module imports
2. **Monitor the health service** in production to track remote availability
3. **Configure appropriate retry counts** based on your infrastructure
4. **Test error scenarios** regularly to ensure graceful degradation
5. **Use the health panel** during development to debug loading issues

## Troubleshooting

### Remote always fails to load
- Check console for specific error messages
- Verify remote server is running
- Check module federation configuration
- Ensure remote exposed modules are correct

### Retry doesn't work
- Check if remote server is actually available
- Look for CORS or network issues in browser console
- Verify module-federation.config.ts has correct remote URL

### Health panel doesn't show
- Ensure you're pressing `Ctrl/Cmd + Shift + H`
- Check browser console for component errors
- Verify `RemoteHealthService` is provided

## Future Enhancements

Potential improvements to consider:

1. Circuit breaker pattern for failed remotes
2. Configurable retry strategies per remote
3. Remote version checking and compatibility validation
4. Automatic fallback to cached versions
5. Admin dashboard for remote health monitoring
6. Metrics collection for remote loading performance
7. A/B testing different retry strategies
