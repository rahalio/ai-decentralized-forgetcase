/**
 * Sla Mutation Hooks
 *
 * React Query hooks for mutating sla data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { slaService } from "../sla.service";
// TODO: Import types
// import type { ... } from "../sla.api-types";

/**
 * Hook to apply lawful extension with notice inside month one
 *
 * Automatically invalidates sla queries on success.
 */
export function useGetExtension() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return slaService.getExtension(data);
    },
    {
      invalidateQueries: [["sla", "Extension"]],
    }
  );
}

/**
 * Hook to issue proportionate id challenge and pause the clock
 *
 * Automatically invalidates sla queries on success.
 */
export function useGetIdentityChallenge() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return slaService.getIdentityChallenge(data);
    },
    {
      invalidateQueries: [["sla", "IdentityChallenge"]],
    }
  );
}

/**
 * Hook to mark id received and resume the compliance clock
 *
 * Automatically invalidates sla queries on success.
 */
export function useGetSatisfy() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return slaService.getSatisfy(data);
    },
    {
      invalidateQueries: [["sla", "Satisfy"]],
    }
  );
}
