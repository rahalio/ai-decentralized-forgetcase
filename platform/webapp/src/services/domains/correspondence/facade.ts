/**
 * Correspondence Domain Facade
 *
 * High-level API for correspondence domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { correspondenceService } from "./correspondence.service";
// TODO: Import types
// import type { ... } from "./correspondence.api-types";

/**
 * Correspondence Facade
 *
 * High-level API for correspondence operations.
 * Components should use this facade instead of services directly.
 */
export const correspondenceFacade = {
  /**
   * List correspondence for a case
   */
  async getCorrespondence(...args: Parameters<typeof correspondenceService.getCorrespondence>): Promise<any> {
    return correspondenceService.getCorrespondence(...args);
  },
  /**
   * Queue completion or refusal letter (mandatory clauses required)
   */
  async createCorrespondence(...args: Parameters<typeof correspondenceService.createCorrespondence>): Promise<any> {
    return correspondenceService.createCorrespondence(...args);
  }
};
