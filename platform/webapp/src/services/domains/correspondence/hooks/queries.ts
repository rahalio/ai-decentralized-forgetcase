/**
 * Correspondence Query Hooks
 *
 * React Query hooks for fetching correspondence data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { correspondenceService } from "../correspondence.service";

/**
 * Hook to list correspondence for a case
 *
 * Query key: ["correspondence", "Correspondence", caseId]
 */
export function useCorrespondence(caseId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["correspondence", "Correspondence", caseId],
    async (orgId: string, signal?: AbortSignal) => {
      return correspondenceService.getCorrespondence(caseId, params, signal);
    },
    {
      enabled: !!caseId
    }
  );
}
