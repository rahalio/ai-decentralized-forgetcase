/**
 * Cases Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/cases.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AuditExportPack = components["schemas"]["AuditExportPack"];
export type CaseChannel = components["schemas"]["CaseChannel"];
export type CaseId = components["schemas"]["CaseId"];
export type CaseStatus = components["schemas"]["CaseStatus"];
export type ErasureCase = components["schemas"]["ErasureCase"];
export type ErasureCaseCreate = components["schemas"]["ErasureCaseCreate"];
export type ErasureCaseListData = components["schemas"]["ErasureCaseListData"];
export type IntakeEvent = components["schemas"]["IntakeEvent"];
export type IntakeEventId = components["schemas"]["IntakeEventId"];
export type AuditExportRequest = components["schemas"]["AuditExportRequest"];
export type VerbalIntakeRequest = components["schemas"]["VerbalIntakeRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateErasureCaseRequestInput = NonNullable<operations["createErasureCase"]["requestBody"]>["content"]["application/json"];
export type CreateVerbalIntakeRequestInput = NonNullable<operations["createVerbalIntake"]["requestBody"]>["content"]["application/json"];
export type CreateAuditExportRequestInput = NonNullable<operations["createAuditExport"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListErasureCasesParams = NonNullable<operations["listErasureCases"]["parameters"]["query"]>;
export type GetErasureCaseParams = operations["getErasureCase"]["parameters"]["path"];
export type ListCaseIntakeEventsParams = operations["listCaseIntakeEvents"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListErasureCasesResponse = operations["listErasureCases"]["responses"]["200"]["content"]["application/json"];
export type CreateErasureCaseResponse = operations["createErasureCase"]["responses"]["201"]["content"]["application/json"];
export type GetErasureCaseResponse = operations["getErasureCase"]["responses"]["200"]["content"]["application/json"];
export type CreateVerbalIntakeResponse = operations["createVerbalIntake"]["responses"]["201"]["content"]["application/json"];
export type ListCaseIntakeEventsResponse = operations["listCaseIntakeEvents"]["responses"]["200"]["content"]["application/json"];
export type CreateAuditExportResponse = operations["createAuditExport"]["responses"]["201"]["content"]["application/json"];


