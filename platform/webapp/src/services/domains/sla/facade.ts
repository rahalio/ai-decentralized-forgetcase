/**
 * Sla Domain Facade
 *
 * High-level API for sla domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { slaService } from "./sla.service";
// TODO: Import types
// import type { ... } from "./sla.api-types";

/**
 * Sla Facade
 *
 * High-level API for sla operations.
 * Components should use this facade instead of services directly.
 */
export const slaFacade = {
  /**
   * Get SLA clock for a case
   */
  async getSla(...args: Parameters<typeof slaService.getSla>): Promise<any> {
    return slaService.getSla(...args);
  },
  /**
   * Apply lawful extension with notice inside month one
   */
  async getExtension(...args: Parameters<typeof slaService.getExtension>): Promise<any> {
    return slaService.getExtension(...args);
  },
  /**
   * Issue proportionate ID challenge and pause the clock
   */
  async getIdentityChallenge(...args: Parameters<typeof slaService.getIdentityChallenge>): Promise<any> {
    return slaService.getIdentityChallenge(...args);
  },
  /**
   * Mark ID received and resume the compliance clock
   */
  async getSatisfy(...args: Parameters<typeof slaService.getSatisfy>): Promise<any> {
    return slaService.getSatisfy(...args);
  }
};
