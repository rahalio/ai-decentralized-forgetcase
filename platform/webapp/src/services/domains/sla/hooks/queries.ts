/**
 * Sla Query Hooks
 *
 * React Query hooks for fetching sla data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { slaService } from "../sla.service";

/**
 * Hook to get sla clock for a case
 *
 * Query key: ["sla", "Sla", caseId]
 */
export function useSla(caseId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["sla", "Sla", caseId],
    async (orgId: string, signal?: AbortSignal) => {
      return slaService.getSla(caseId, params, signal);
    },
    {
      enabled: !!caseId
    }
  );
}
