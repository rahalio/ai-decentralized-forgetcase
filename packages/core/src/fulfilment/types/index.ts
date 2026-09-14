/**
 * Fulfilment Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/fulfilment.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type BackupBeyondUseTask = components["schemas"]["BackupBeyondUseTask"];
export type BackupBeyondUseTaskComplete = components["schemas"]["BackupBeyondUseTaskComplete"];
export type BackupBeyondUseTaskCreate = components["schemas"]["BackupBeyondUseTaskCreate"];
export type BackupTaskId = components["schemas"]["BackupTaskId"];
export type BackupTaskStatus = components["schemas"]["BackupTaskStatus"];
export type CaseId = components["schemas"]["CaseId"];
export type LiveErasureTask = components["schemas"]["LiveErasureTask"];
export type LiveErasureTaskComplete = components["schemas"]["LiveErasureTaskComplete"];
export type LiveErasureTaskCreate = components["schemas"]["LiveErasureTaskCreate"];
export type LiveTaskId = components["schemas"]["LiveTaskId"];
export type LiveTaskStatus = components["schemas"]["LiveTaskStatus"];
export type NoticeId = components["schemas"]["NoticeId"];
export type NoticeStatus = components["schemas"]["NoticeStatus"];
export type RecipientKind = components["schemas"]["RecipientKind"];
export type RecipientNotice = components["schemas"]["RecipientNotice"];
export type RecipientNoticeCreate = components["schemas"]["RecipientNoticeCreate"];
export type RecipientNoticeUpdate = components["schemas"]["RecipientNoticeUpdate"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateLiveErasureTaskRequestInput = NonNullable<operations["createLiveErasureTask"]["requestBody"]>["content"]["application/json"];
export type CompleteLiveErasureTaskRequestInput = NonNullable<operations["completeLiveErasureTask"]["requestBody"]>["content"]["application/json"];
export type CreateBackupBeyondUseTaskRequestInput = NonNullable<operations["createBackupBeyondUseTask"]["requestBody"]>["content"]["application/json"];
export type CompleteBackupBeyondUseTaskRequestInput = NonNullable<operations["completeBackupBeyondUseTask"]["requestBody"]>["content"]["application/json"];
export type CreateRecipientNoticeRequestInput = NonNullable<operations["createRecipientNotice"]["requestBody"]>["content"]["application/json"];
export type UpdateRecipientNoticeRequestInput = NonNullable<operations["updateRecipientNotice"]["requestBody"]>["content"]["application/json"];
export type UpdateRecipientNoticeRequest = UpdateRecipientNoticeRequestInput;


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListLiveErasureTasksParams = operations["listLiveErasureTasks"]["parameters"]["path"];
export type CreateLiveErasureTaskParams = operations["createLiveErasureTask"]["parameters"]["path"];
export type CompleteLiveErasureTaskParams = operations["completeLiveErasureTask"]["parameters"]["path"];
export type ListBackupBeyondUseTasksParams = NonNullable<operations["listBackupBeyondUseTasks"]["parameters"]["query"]>;
export type CompleteBackupBeyondUseTaskParams = operations["completeBackupBeyondUseTask"]["parameters"]["path"];
export type ListRecipientNoticesParams = operations["listRecipientNotices"]["parameters"]["path"];
export type CreateRecipientNoticeParams = operations["createRecipientNotice"]["parameters"]["path"];
export type UpdateRecipientNoticeParams = operations["updateRecipientNotice"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListLiveErasureTasksResponse = operations["listLiveErasureTasks"]["responses"]["200"]["content"]["application/json"];
export type CreateLiveErasureTaskResponse = operations["createLiveErasureTask"]["responses"]["201"]["content"]["application/json"];
export type CompleteLiveErasureTaskResponse = operations["completeLiveErasureTask"]["responses"]["200"]["content"]["application/json"];
export type ListBackupBeyondUseTasksResponse = operations["listBackupBeyondUseTasks"]["responses"]["200"]["content"]["application/json"];
export type CreateBackupBeyondUseTaskResponse = operations["createBackupBeyondUseTask"]["responses"]["201"]["content"]["application/json"];
export type CompleteBackupBeyondUseTaskResponse = operations["completeBackupBeyondUseTask"]["responses"]["200"]["content"]["application/json"];
export type ListRecipientNoticesResponse = operations["listRecipientNotices"]["responses"]["200"]["content"]["application/json"];
export type CreateRecipientNoticeResponse = operations["createRecipientNotice"]["responses"]["201"]["content"]["application/json"];
export type UpdateRecipientNoticeResponse = operations["updateRecipientNotice"]["responses"]["200"]["content"]["application/json"];


