/**
 * Assessments Query Hooks
 *
 * React Query hooks for fetching assessments data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { assessmentsService } from "../assessments.service";

/**
 * Hook to get current grounds assessment for a case
 *
 * Query key: ["assessments", "Assessment", caseId]
 */
export function useAssessment(caseId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["assessments", "Assessment", caseId],
    async (orgId: string, signal?: AbortSignal) => {
      return assessmentsService.getAssessment(caseId, params, signal);
    },
    {
      enabled: !!caseId
    }
  );
}

/**
 * Hook to list exemptions applied to a case
 *
 * Query key: ["assessments", "Exemption", caseId]
 */
export function useExemption(caseId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["assessments", "Exemption", caseId],
    async (orgId: string, signal?: AbortSignal) => {
      return assessmentsService.getExemption(caseId, params, signal);
    },
    {
      enabled: !!caseId
    }
  );
}
