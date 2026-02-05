# Quick Start: Testing Remote Error Handling

## Quick Demo (2 minutes)

### 1. Start the Application
```bash
# Terminal 1 - Start shell
nx serve shell

# Terminal 2 - Start person remote
nx serve person

# Terminal 3 - Start vehicle remote
nx serve vehicle
```

### 2. Test Normal Operation
1. Open http://localhost:4200
2. Navigate to "Person" - should load normally
3. Navigate to "Vehicle" - should load normally

### 3. Test Error Handling

#### Scenario A: Remote Goes Down
1. Stop the person remote server (Ctrl+C in Terminal 2)
2. In the app, click "Person" in the sidebar
3. **Observe**:
   - Console shows 3 loading attempts with delays
   - Toast notification appears
   - Error page displays with "Retry" option
4. Restart person remote (`nx serve person`)
5. Click "Retry" button on error page
6. **Result**: Person module loads successfully

#### Scenario B: View Health Status
1. Press `Ctrl/Cmd + Shift + H`
2. **Observe**: Health status panel appears in bottom-right
3. Shows status of all remotes (person, vehicle, operation_names, clear_session)
4. After the error test, person shows failure count
5. After successful retry, failure count resets

#### Scenario C: Multiple Failures
1. Stop both person and vehicle remotes
2. Try to navigate to each
3. **Observe**:
   - Both show in health panel as unavailable
   - Failure counts increment
   - Each has independent error handling

### 4. Console Output Examples

**Successful Load:**
```
Loading remote 'person'...
✓ Module loaded successfully
```

**Failed with Retry:**
```
Loading remote 'person'...
✗ Failed to load remote 'person' (attempt 1/3): Failed to fetch
Loading remote 'person' (attempt 2/3)...
✗ Failed to load remote 'person' (attempt 2/3): Failed to fetch
Loading remote 'person' (attempt 3/3)...
✗ Failed to load remote 'person' (attempt 3/3): Failed to fetch
❌ Failed to load module 'person' after 3 attempts
```

## Testing Checklist

- [ ] App loads without errors
- [ ] Can navigate to all remotes when running
- [ ] Error page appears when remote is down
- [ ] Console shows retry attempts (3 total)
- [ ] Toast notification appears on failure
- [ ] Health panel toggles with Ctrl/Cmd + Shift + H
- [ ] Retry button works after restarting remote
- [ ] Health status updates after success/failure
- [ ] Can navigate to other remotes when one fails

## Key Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + Shift + H` | Toggle health status panel |

## What to Look For

### ✅ Good Signs
- Console shows loading attempts
- User sees friendly error messages
- App doesn't crash or freeze
- Can navigate to other modules
- Retry functionality works
- Health panel shows accurate status

### ❌ Problems
- No console output during loading
- App crashes on remote failure
- Blank screen instead of error page
- Health panel doesn't appear
- Retry button doesn't work

## Troubleshooting Quick Fixes

### Health Panel Won't Show
```typescript
// Check that component is in app.html
<app-remote-health-status></app-remote-health-status>
```

### Error Page Not Appearing
```typescript
// Verify error route exists in app.routes.ts
{
  path: 'error',
  component: RemoteErrorComponent,
}
```

### No Retry Attempts
```typescript
// Check wrapRemoteLoader is used in routes
loadChildren: () =>
  wrapRemoteLoader(
    'person',
    () => import('person/Routes').then((m) => m!.remoteRoutes),
    inject(MessageService)
  )()
```

## Development Tips

1. **Keep Console Open**: Watch retry attempts and error details
2. **Use Health Panel**: Quick visibility into remote status
3. **Test Each Remote**: Verify error handling for all modules
4. **Check Network Tab**: See actual HTTP requests being retried
5. **Monitor Toast**: User-facing notifications show up here

## Common Test Scenarios

### Network Timeout
Simulate with browser DevTools:
1. Open DevTools → Network tab
2. Set throttling to "Slow 3G"
3. Navigate to remote
4. Should see delayed loading with retries

### Module Not Found
1. Change remote URL in module-federation.config.ts
2. Try loading that remote
3. Should fail gracefully with error page

### Partial Availability
1. Start only shell and person
2. Vehicle and operation_names should fail gracefully
3. Person should work normally
4. App remains functional

## Performance Check

Monitor these during testing:
- **First Load**: ~200-500ms (normal)
- **Retry Delay**: 1s, 2s, 3s (exponential)
- **Total Failure Time**: ~6s for 3 attempts
- **Health Check**: Instant (in-memory)

## Next: Production Readiness

Once testing looks good:
1. Review `REMOTE_ERROR_HANDLING.md` for full docs
2. Adjust retry counts for production needs
3. Consider adding monitoring/metrics
4. Test with actual production scenarios
5. Document any custom configurations

---

**Need Help?** Check `IMPLEMENTATION_SUMMARY.md` for architecture details or `REMOTE_ERROR_HANDLING.md` for comprehensive documentation.
