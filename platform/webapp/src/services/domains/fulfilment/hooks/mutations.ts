/**
 * Fulfilment Mutation Hooks
 *
 * React Query hooks for mutating fulfilment data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { fulfilmentService } from "../fulfilment.service";
// TODO: Import types
// import type { ... } from "../fulfilment.api-types";

/**
 * Hook to create a live system erasure task (requires assessment outcome erase)
 *
 * Automatically invalidates fulfilment queries on success.
 */
export function useCreateLiveErasureTask() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return fulfilmentService.createLiveErasureTask(data);
    },
    {
      invalidateQueries: [["fulfilment", "LiveErasureTask"]],
    }
  );
}

/**
 * Hook to mark a live system as erased
 *
 * Automatically invalidates fulfilment queries on success.
 */
export function useCreateComplete() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return fulfilmentService.createComplete(data);
    },
    {
      invalidateQueries: [["fulfilment", "Complete"]],
    }
  );
}

/**
 * Hook to create a backup beyond-use task
 *
 * Automatically invalidates fulfilment queries on success.
 */
export function useCreateBackupBeyondUseTask() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return fulfilmentService.createBackupBeyondUseTask(data);
    },
    {
      invalidateQueries: [["fulfilment", "BackupBeyondUseTask"]],
    }
  );
}

/**
 * Hook to mark backup beyond-use (or documented n/a)
 *
 * Automatically invalidates fulfilment queries on success.
 */
export function useCreateComplete() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return fulfilmentService.createComplete(data);
    },
    {
      invalidateQueries: [["fulfilment", "Complete"]],
    }
  );
}

/**
 * Hook to add a recipient or online-copy notice obligation
 *
 * Automatically invalidates fulfilment queries on success.
 */
export function useCreateRecipientNotice() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return fulfilmentService.createRecipientNotice(data);
    },
    {
      invalidateQueries: [["fulfilment", "RecipientNotice"]],
    }
  );
}

/**
 * Hook to update notice status (sent / disproportionate / impossible)
 *
 * Automatically invalidates fulfilment queries on success.
 */
export function useUpdateRecipientNotice() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return fulfilmentService.updateRecipientNotice(data);
    },
    {
      invalidateQueries: [["fulfilment", "RecipientNotice"]],
    }
  );
}
