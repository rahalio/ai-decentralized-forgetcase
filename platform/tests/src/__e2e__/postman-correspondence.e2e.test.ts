/**
 * Postman-collection 1:1 Vitest tests for correspondence (generated)
 *
 * One it() = one API request. Add sample data to vars for e2e runs.
 * Run: pnpm test:e2e or pnpm test:suite:db
 * Requires: API server at baseUrl (default http://localhost:3000)
 */

import { describe, it, expect } from "vitest";

const vars: Record<string, string> = {
  baseUrl: "http://localhost:3000",
  orgId: "test-org",
  accessToken: "",
  caseId: "",
};

function sub(s: string): string {
  return s.replace(/\{\{([^}]+)\}\}/g, (_, k) => vars[k.trim()] ?? "");
}

describe("Postman / correspondence (1:1 generated)", () => {

  it("listCaseCorrespondence", async () => {
    const url = sub("{{baseUrl}}/v1/erasure-cases/{{caseId}}/correspondence");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("sendCaseCorrespondence", async () => {
    const url = sub("{{baseUrl}}/v1/erasure-cases/{{caseId}}/correspondence");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"templateType\": \"completion\",\n  \"body\": \"\",\n  \"includesIcoComplaintRights\": false,\n  \"includesJudicialRemedy\": false,\n  \"includesReasons\": false,\n  \"includesBackupHonesty\": true,\n  \"channel\": \"email\"\n}"),
    });
    expect(res.status).toBe(201);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });
});
