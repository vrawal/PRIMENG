import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface RemoteStatus {
  name: string;
  available: boolean;
  lastChecked: Date;
  failureCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class RemoteHealthService {
  private remotes = ['clear_session', 'person', 'vehicle', 'operation_names'];
  private statusMap = new Map<string, RemoteStatus>();
  private statusSubject = new BehaviorSubject<Map<string, RemoteStatus>>(
    new Map()
  );

  public status$: Observable<Map<string, RemoteStatus>> =
    this.statusSubject.asObservable();

  constructor() {
    this.initializeRemotes();
  }

  private initializeRemotes(): void {
    this.remotes.forEach((remote) => {
      this.statusMap.set(remote, {
        name: remote,
        available: true,
        lastChecked: new Date(),
        failureCount: 0,
      });
    });
    this.statusSubject.next(new Map(this.statusMap));
  }

  /**
   * Record a successful load for a remote
   */
  recordSuccess(remoteName: string): void {
    const status = this.statusMap.get(remoteName);
    if (status) {
      status.available = true;
      status.lastChecked = new Date();
      status.failureCount = 0;
      this.statusSubject.next(new Map(this.statusMap));
    }
  }

  /**
   * Record a failed load for a remote
   */
  recordFailure(remoteName: string): void {
    const status = this.statusMap.get(remoteName);
    if (status) {
      status.available = false;
      status.lastChecked = new Date();
      status.failureCount++;
      this.statusSubject.next(new Map(this.statusMap));
    }
  }

  /**
   * Get the current status of a specific remote
   */
  getRemoteStatus(remoteName: string): RemoteStatus | undefined {
    return this.statusMap.get(remoteName);
  }

  /**
   * Get all remote statuses
   */
  getAllStatuses(): Map<string, RemoteStatus> {
    return new Map(this.statusMap);
  }

  /**
   * Check if a remote is currently available
   */
  isRemoteAvailable(remoteName: string): boolean {
    const status = this.statusMap.get(remoteName);
    return status?.available ?? false;
  }

  /**
   * Reset failure count for a remote (useful after manual intervention)
   */
  resetRemote(remoteName: string): void {
    const status = this.statusMap.get(remoteName);
    if (status) {
      status.failureCount = 0;
      status.lastChecked = new Date();
      this.statusSubject.next(new Map(this.statusMap));
    }
  }
}
