/**
 * Cases Query Hooks
 *
 * React Query hooks for fetching cases data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { casesService } from "../cases.service";

/**
 * Hook to list erasure cases (desk filters)
 *
 * Query key: ["cases", "ErasureCase", ]
 */
export function useErasureCase(params?: Record<string, any>) {
  return useTenantQuery(
    ["cases", "ErasureCase", ],
    async (orgId: string, signal?: AbortSignal) => {
      return casesService.getErasureCase(params, signal);
    }
  );
}

/**
 * Hook to get case workspace record
 *
 * Query key: ["cases", "ErasureCase", caseId]
 */
export function useErasureCase(caseId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["cases", "ErasureCase", caseId],
    async (orgId: string, signal?: AbortSignal) => {
      return casesService.getErasureCase(caseId, params, signal);
    },
    {
      enabled: !!caseId
    }
  );
}

/**
 * Hook to list intake events for a case
 *
 * Query key: ["cases", "IntakeEvent", caseId]
 */
export function useIntakeEvent(caseId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["cases", "IntakeEvent", caseId],
    async (orgId: string, signal?: AbortSignal) => {
      return casesService.getIntakeEvent(caseId, params, signal);
    },
    {
      enabled: !!caseId
    }
  );
}
