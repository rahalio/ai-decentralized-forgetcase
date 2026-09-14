/**
 * Cases Domain Facade
 *
 * High-level API for cases domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { casesService } from "./cases.service";
// TODO: Import types
// import type { ... } from "./cases.api-types";

/**
 * Cases Facade
 *
 * High-level API for cases operations.
 * Components should use this facade instead of services directly.
 */
export const casesFacade = {
  /**
   * List erasure cases (desk filters)
   */
  async getErasureCase(...args: Parameters<typeof casesService.getErasureCase>): Promise<any> {
    return casesService.getErasureCase(...args);
  },
  /**
   * Create an erasure case from written or portal intake
   */
  async createErasureCase(...args: Parameters<typeof casesService.createErasureCase>): Promise<any> {
    return casesService.createErasureCase(...args);
  },
  /**
   * Get case workspace record
   */
  async getErasureCase(...args: Parameters<typeof casesService.getErasureCase>): Promise<any> {
    return casesService.getErasureCase(...args);
  },
  /**
   * Guided verbal intake with read-back confirmation
   */
  async createVerbal(...args: Parameters<typeof casesService.createVerbal>): Promise<any> {
    return casesService.createVerbal(...args);
  },
  /**
   * List intake events for a case
   */
  async getIntakeEvent(...args: Parameters<typeof casesService.getIntakeEvent>): Promise<any> {
    return casesService.getIntakeEvent(...args);
  },
  /**
   * Create a minimised DPO / ICO audit export pack
   */
  async createExport(...args: Parameters<typeof casesService.createExport>): Promise<any> {
    return casesService.createExport(...args);
  }
};
