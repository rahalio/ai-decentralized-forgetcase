/**
 * Sla Domain Contracts
 *
 * Re-exports Zod schemas from @forgetcase/core for runtime validation.
 * This avoids duplication and ensures alignment with the API contract.
 *
 * Architecture:
 * - Single source of truth: @forgetcase/core
 * - No code duplication or drift
 * - Runtime validation of API responses
 * - Used in services to validate responses
 *
 * @see @forgetcase/core/sla for the source schemas
 */

import { slaSchemas as coreSlaSchemas } from "@forgetcase/core/sla";
import type { z } from "zod";

/**
 * Re-export schemas from core
 * These are the same schemas used by the api-server, ensuring perfect alignment
 */
export const {
  // TODO: Add specific schema exports based on OpenAPI spec
  // ResponseMeta,
  // PageInfo,
  // etc.
} = coreSlaSchemas;

/**
 * Export all schemas as a namespace for convenience
 */
export const slaSchemas = coreSlaSchemas;
