/**
 * Cases Mutation Hooks
 *
 * React Query hooks for mutating cases data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { casesService } from "../cases.service";
// TODO: Import types
// import type { ... } from "../cases.api-types";

/**
 * Hook to create an erasure case from written or portal intake
 *
 * Automatically invalidates cases queries on success.
 */
export function useCreateErasureCase() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return casesService.createErasureCase(data);
    },
    {
      invalidateQueries: [["cases", "ErasureCase"]],
    }
  );
}

/**
 * Hook to guided verbal intake with read-back confirmation
 *
 * Automatically invalidates cases queries on success.
 */
export function useCreateVerbal() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return casesService.createVerbal(data);
    },
    {
      invalidateQueries: [["cases", "Verbal"]],
    }
  );
}

/**
 * Hook to create a minimised dpo / ico audit export pack
 *
 * Automatically invalidates cases queries on success.
 */
export function useCreateExport() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return casesService.createExport(data);
    },
    {
      invalidateQueries: [["cases", "Export"]],
    }
  );
}
