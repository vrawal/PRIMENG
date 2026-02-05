import { TestBed } from '@angular/core/testing';
import { RemoteHealthService } from './remote-health.service';

describe('RemoteHealthService', () => {
  let service: RemoteHealthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemoteHealthService],
    });
    service = TestBed.inject(RemoteHealthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default remotes', () => {
    const statuses = service.getAllStatuses();
    expect(statuses.size).toBeGreaterThan(0);
    expect(statuses.has('person')).toBe(true);
    expect(statuses.has('vehicle')).toBe(true);
  });

  it('should record success for a remote', () => {
    service.recordSuccess('person');
    const status = service.getRemoteStatus('person');
    expect(status?.available).toBe(true);
    expect(status?.failureCount).toBe(0);
  });

  it('should record failure for a remote', () => {
    service.recordFailure('person');
    const status = service.getRemoteStatus('person');
    expect(status?.available).toBe(false);
    expect(status?.failureCount).toBe(1);
  });

  it('should increment failure count on multiple failures', () => {
    service.recordFailure('vehicle');
    service.recordFailure('vehicle');
    service.recordFailure('vehicle');
    const status = service.getRemoteStatus('vehicle');
    expect(status?.failureCount).toBe(3);
  });

  it('should reset failure count on success', () => {
    service.recordFailure('person');
    service.recordFailure('person');
    service.recordSuccess('person');
    const status = service.getRemoteStatus('person');
    expect(status?.failureCount).toBe(0);
    expect(status?.available).toBe(true);
  });

  it('should check remote availability', () => {
    service.recordSuccess('vehicle');
    expect(service.isRemoteAvailable('vehicle')).toBe(true);

    service.recordFailure('vehicle');
    expect(service.isRemoteAvailable('vehicle')).toBe(false);
  });

  it('should reset a remote', () => {
    service.recordFailure('person');
    service.recordFailure('person');
    service.resetRemote('person');
    const status = service.getRemoteStatus('person');
    expect(status?.failureCount).toBe(0);
  });
});
