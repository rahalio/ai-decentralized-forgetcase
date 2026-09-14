/**
 * Assessments Domain Facade
 *
 * High-level API for assessments domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { assessmentsService } from "./assessments.service";
// TODO: Import types
// import type { ... } from "./assessments.api-types";

/**
 * Assessments Facade
 *
 * High-level API for assessments operations.
 * Components should use this facade instead of services directly.
 */
export const assessmentsFacade = {
  /**
   * Get current grounds assessment for a case
   */
  async getAssessment(...args: Parameters<typeof assessmentsService.getAssessment>): Promise<any> {
    return assessmentsService.getAssessment(...args);
  },
  /**
   * Record grounds assessment (blocks fulfilment until confirmed)
   */
  async createAssessment(...args: Parameters<typeof assessmentsService.createAssessment>): Promise<any> {
    return assessmentsService.createAssessment(...args);
  },
  /**
   * List exemptions applied to a case
   */
  async getExemption(...args: Parameters<typeof assessmentsService.getExemption>): Promise<any> {
    return assessmentsService.getExemption(...args);
  },
  /**
   * Apply an exemption or unfounded/excessive determination
   */
  async getExemption(...args: Parameters<typeof assessmentsService.getExemption>): Promise<any> {
    return assessmentsService.getExemption(...args);
  }
};
