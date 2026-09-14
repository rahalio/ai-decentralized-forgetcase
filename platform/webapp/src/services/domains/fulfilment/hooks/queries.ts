/**
 * Fulfilment Query Hooks
 *
 * React Query hooks for fetching fulfilment data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { fulfilmentService } from "../fulfilment.service";

/**
 * Hook to list live erasure tasks for a case
 *
 * Query key: ["fulfilment", "LiveErasureTask", caseId]
 */
export function useLiveErasureTask(caseId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["fulfilment", "LiveErasureTask", caseId],
    async (orgId: string, signal?: AbortSignal) => {
      return fulfilmentService.getLiveErasureTask(caseId, params, signal);
    },
    {
      enabled: !!caseId
    }
  );
}

/**
 * Hook to list backup beyond-use tasks (records queue)
 *
 * Query key: ["fulfilment", "BackupBeyondUseTask", ]
 */
export function useBackupBeyondUseTask(params?: Record<string, any>) {
  return useTenantQuery(
    ["fulfilment", "BackupBeyondUseTask", ],
    async (orgId: string, signal?: AbortSignal) => {
      return fulfilmentService.getBackupBeyondUseTask(params, signal);
    }
  );
}

/**
 * Hook to list recipient and online-copy notices
 *
 * Query key: ["fulfilment", "RecipientNotice", caseId]
 */
export function useRecipientNotice(caseId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["fulfilment", "RecipientNotice", caseId],
    async (orgId: string, signal?: AbortSignal) => {
      return fulfilmentService.getRecipientNotice(caseId, params, signal);
    },
    {
      enabled: !!caseId
    }
  );
}
