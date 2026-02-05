import { loadRemoteWithRetry } from './remote-loader.util';

describe('Remote Loader Utilities', () => {
  describe('loadRemoteWithRetry', () => {
    it('should return success when loader succeeds', async () => {
      const mockLoader = jest.fn().mockResolvedValue({ data: 'test' });

      const result = await loadRemoteWithRetry(mockLoader, {
        remoteName: 'test-remote',
        maxRetries: 0,
      });

      expect(result.success).toBe(true);
      expect(result.data).toEqual({ data: 'test' });
      expect(mockLoader).toHaveBeenCalledTimes(1);
    });

    it('should retry on failure', async () => {
      let attemptCount = 0;
      const mockLoader = jest.fn().mockImplementation(() => {
        attemptCount++;
        if (attemptCount < 3) {
          return Promise.reject(new Error('Loading failed'));
        }
        return Promise.resolve({ data: 'success after retry' });
      });

      const result = await loadRemoteWithRetry(mockLoader, {
        remoteName: 'test-remote',
        maxRetries: 3,
        retryDelay: 10, // Short delay for testing
      });

      expect(result.success).toBe(true);
      expect(result.data).toEqual({ data: 'success after retry' });
      expect(mockLoader).toHaveBeenCalledTimes(3);
    });

    it('should return failure after max retries', async () => {
      const mockLoader = jest
        .fn()
        .mockRejectedValue(new Error('Persistent error'));

      const result = await loadRemoteWithRetry(mockLoader, {
        remoteName: 'test-remote',
        maxRetries: 2,
        retryDelay: 10,
      });

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error?.message).toContain('Failed to load module');
      expect(mockLoader).toHaveBeenCalledTimes(3); // Initial + 2 retries
    });

    it('should not retry when maxRetries is 0', async () => {
      const mockLoader = jest.fn().mockRejectedValue(new Error('Error'));

      const result = await loadRemoteWithRetry(mockLoader, {
        remoteName: 'test-remote',
        maxRetries: 0,
      });

      expect(result.success).toBe(false);
      expect(mockLoader).toHaveBeenCalledTimes(1);
    });
  });
});
