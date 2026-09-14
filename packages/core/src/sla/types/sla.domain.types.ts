/**
 * Sla Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/sla.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type CaseId = components["schemas"]["CaseId"];
export type ChallengeId = components["schemas"]["ChallengeId"];
export type IdentityChallenge = components["schemas"]["IdentityChallenge"];
export type IdentityChallengeSatisfy = components["schemas"]["IdentityChallengeSatisfy"];
export type IdentityChallengeStatus = components["schemas"]["IdentityChallengeStatus"];
export type SlaClock = components["schemas"]["SlaClock"];
export type IdentityChallengeRequest = components["schemas"]["IdentityChallengeRequest"];
export type SlaExtensionRequest = components["schemas"]["SlaExtensionRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type ExtendSlaClockRequestInput = NonNullable<operations["extendSlaClock"]["requestBody"]>["content"]["application/json"];
export type RequestIdentityChallengeRequestInput = NonNullable<operations["requestIdentityChallenge"]["requestBody"]>["content"]["application/json"];
export type SatisfyIdentityChallengeRequestInput = NonNullable<operations["satisfyIdentityChallenge"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type GetSlaClockParams = operations["getSlaClock"]["parameters"]["path"];
export type ExtendSlaClockParams = operations["extendSlaClock"]["parameters"]["path"];
export type RequestIdentityChallengeParams = operations["requestIdentityChallenge"]["parameters"]["path"];
export type SatisfyIdentityChallengeParams = operations["satisfyIdentityChallenge"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type GetSlaClockResponse = operations["getSlaClock"]["responses"]["200"]["content"]["application/json"];
export type ExtendSlaClockResponse = operations["extendSlaClock"]["responses"]["200"]["content"]["application/json"];
export type RequestIdentityChallengeResponse = operations["requestIdentityChallenge"]["responses"]["201"]["content"]["application/json"];
export type SatisfyIdentityChallengeResponse = operations["satisfyIdentityChallenge"]["responses"]["200"]["content"]["application/json"];


