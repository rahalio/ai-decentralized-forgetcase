/**
 * Correspondence Domain Contracts
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
 * @see @forgetcase/core/correspondence for the source schemas
 */

import { correspondenceSchemas as coreCorrespondenceSchemas } from "@forgetcase/core/correspondence";
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
} = coreCorrespondenceSchemas;

/**
 * Export all schemas as a namespace for convenience
 */
export const correspondenceSchemas = coreCorrespondenceSchemas;
