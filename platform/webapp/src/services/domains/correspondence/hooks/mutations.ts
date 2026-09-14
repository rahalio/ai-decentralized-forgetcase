/**
 * Correspondence Mutation Hooks
 *
 * React Query hooks for mutating correspondence data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { correspondenceService } from "../correspondence.service";
// TODO: Import types
// import type { ... } from "../correspondence.api-types";

/**
 * Hook to queue completion or refusal letter (mandatory clauses required)
 *
 * Automatically invalidates correspondence queries on success.
 */
export function useCreateCorrespondence() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return correspondenceService.createCorrespondence(data);
    },
    {
      invalidateQueries: [["correspondence", "Correspondence"]],
    }
  );
}
