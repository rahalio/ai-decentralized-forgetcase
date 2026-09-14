/**
 * Fulfilment Domain Facade
 *
 * High-level API for fulfilment domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { fulfilmentService } from "./fulfilment.service";
// TODO: Import types
// import type { ... } from "./fulfilment.api-types";

/**
 * Fulfilment Facade
 *
 * High-level API for fulfilment operations.
 * Components should use this facade instead of services directly.
 */
export const fulfilmentFacade = {
  /**
   * List live erasure tasks for a case
   */
  async getLiveErasureTask(...args: Parameters<typeof fulfilmentService.getLiveErasureTask>): Promise<any> {
    return fulfilmentService.getLiveErasureTask(...args);
  },
  /**
   * Create a live system erasure task (requires assessment outcome erase)
   */
  async createLiveErasureTask(...args: Parameters<typeof fulfilmentService.createLiveErasureTask>): Promise<any> {
    return fulfilmentService.createLiveErasureTask(...args);
  },
  /**
   * Mark a live system as erased
   */
  async createComplete(...args: Parameters<typeof fulfilmentService.createComplete>): Promise<any> {
    return fulfilmentService.createComplete(...args);
  },
  /**
   * List backup beyond-use tasks (records queue)
   */
  async getBackupBeyondUseTask(...args: Parameters<typeof fulfilmentService.getBackupBeyondUseTask>): Promise<any> {
    return fulfilmentService.getBackupBeyondUseTask(...args);
  },
  /**
   * Create a backup beyond-use task
   */
  async createBackupBeyondUseTask(...args: Parameters<typeof fulfilmentService.createBackupBeyondUseTask>): Promise<any> {
    return fulfilmentService.createBackupBeyondUseTask(...args);
  },
  /**
   * Mark backup beyond-use (or documented N/A)
   */
  async createComplete(...args: Parameters<typeof fulfilmentService.createComplete>): Promise<any> {
    return fulfilmentService.createComplete(...args);
  },
  /**
   * List recipient and online-copy notices
   */
  async getRecipientNotice(...args: Parameters<typeof fulfilmentService.getRecipientNotice>): Promise<any> {
    return fulfilmentService.getRecipientNotice(...args);
  },
  /**
   * Add a recipient or online-copy notice obligation
   */
  async createRecipientNotice(...args: Parameters<typeof fulfilmentService.createRecipientNotice>): Promise<any> {
    return fulfilmentService.createRecipientNotice(...args);
  },
  /**
   * Update notice status (sent / disproportionate / impossible)
   */
  async updateRecipientNotice(...args: Parameters<typeof fulfilmentService.updateRecipientNotice>): Promise<any> {
    return fulfilmentService.updateRecipientNotice(...args);
  }
};
