/**
 * Assessments Mutation Hooks
 *
 * React Query hooks for mutating assessments data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { assessmentsService } from "../assessments.service";
// TODO: Import types
// import type { ... } from "../assessments.api-types";

/**
 * Hook to record grounds assessment (blocks fulfilment until confirmed)
 *
 * Automatically invalidates assessments queries on success.
 */
export function useCreateAssessment() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return assessmentsService.createAssessment(data);
    },
    {
      invalidateQueries: [["assessments", "Assessment"]],
    }
  );
}

/**
 * Hook to apply an exemption or unfounded/excessive determination
 *
 * Automatically invalidates assessments queries on success.
 */
export function useGetExemption() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return assessmentsService.getExemption(data);
    },
    {
      invalidateQueries: [["assessments", "Exemption"]],
    }
  );
}
