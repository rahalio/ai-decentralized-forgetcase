import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const submitGroundAssessment_Body = z
  .object({
    rightApplies: z.boolean(),
    grounds: z
      .array(
        z.enum([
          'no_longer_necessary',
          'consent_withdrawn',
          'legitimate_interest_objection',
          'marketing_objection',
          'unlawful',
          'legal_obligation',
          'child_iss',
        ])
      )
      .min(1),
    outcome: z.enum(['erase', 'refuse', 'escalate_legal']),
    childWeightRationale: z.string().optional(),
    notes: z.string().optional(),
  })
  .passthrough();
const applyExemption_Body = z
  .object({
    exemptionType: z.enum([
      'freedom_of_expression',
      'legal_obligation',
      'public_interest_task',
      'archiving_research_statistics',
      'legal_claims',
      'public_health',
      'occupational_medicine',
      'manifestly_unfounded',
      'excessive',
      'dpa_2018',
    ]),
    rationale: z.string().min(1),
    feeBasis: z.string().optional(),
    feeAmount: z.string().optional(),
  })
  .passthrough();
const CaseId = z.string();
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const AssessmentId = z.string();
const Article17Ground = z.enum([
  'no_longer_necessary',
  'consent_withdrawn',
  'legitimate_interest_objection',
  'marketing_objection',
  'unlawful',
  'legal_obligation',
  'child_iss',
]);
const AssessmentOutcome = z.enum(['erase', 'refuse', 'escalate_legal']);
const GroundAssessment = z
  .object({
    assessmentId: z.string().regex(/^asm_[0-9A-HJKMNP-TV-Z]{26}$/),
    caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
    rightApplies: z.boolean(),
    grounds: z.array(
      z.enum([
        'no_longer_necessary',
        'consent_withdrawn',
        'legitimate_interest_objection',
        'marketing_objection',
        'unlawful',
        'legal_obligation',
        'child_iss',
      ])
    ),
    outcome: z.enum(['erase', 'refuse', 'escalate_legal']),
    childWeightRationale: z.string(),
    notes: z.string().optional(),
    recordedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const GroundAssessmentResponse = z
  .object({
    data: z
      .object({
        assessmentId: z.string().regex(/^asm_[0-9A-HJKMNP-TV-Z]{26}$/),
        caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
        rightApplies: z.boolean(),
        grounds: z.array(
          z.enum([
            'no_longer_necessary',
            'consent_withdrawn',
            'legitimate_interest_objection',
            'marketing_objection',
            'unlawful',
            'legal_obligation',
            'child_iss',
          ])
        ),
        outcome: z.enum(['erase', 'refuse', 'escalate_legal']),
        childWeightRationale: z.string(),
        notes: z.string().optional(),
        recordedAt: z.string().datetime({ offset: true }).optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const GroundAssessmentSubmit = z
  .object({
    rightApplies: z.boolean(),
    grounds: z
      .array(
        z.enum([
          'no_longer_necessary',
          'consent_withdrawn',
          'legitimate_interest_objection',
          'marketing_objection',
          'unlawful',
          'legal_obligation',
          'child_iss',
        ])
      )
      .min(1),
    outcome: z.enum(['erase', 'refuse', 'escalate_legal']),
    childWeightRationale: z.string().optional(),
    notes: z.string().optional(),
  })
  .passthrough();
const ExemptionId = z.string();
const ExemptionType = z.enum([
  'freedom_of_expression',
  'legal_obligation',
  'public_interest_task',
  'archiving_research_statistics',
  'legal_claims',
  'public_health',
  'occupational_medicine',
  'manifestly_unfounded',
  'excessive',
  'dpa_2018',
]);
const ExemptionRecord = z
  .object({
    exemptionId: z.string().regex(/^exm_[0-9A-HJKMNP-TV-Z]{26}$/),
    caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
    exemptionType: z.enum([
      'freedom_of_expression',
      'legal_obligation',
      'public_interest_task',
      'archiving_research_statistics',
      'legal_claims',
      'public_health',
      'occupational_medicine',
      'manifestly_unfounded',
      'excessive',
      'dpa_2018',
    ]),
    rationale: z.string(),
    feeBasis: z.string().optional(),
    feeAmount: z.string().optional(),
    appliedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ExemptionListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              exemptionId: z.string().regex(/^exm_[0-9A-HJKMNP-TV-Z]{26}$/),
              caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
              exemptionType: z.enum([
                'freedom_of_expression',
                'legal_obligation',
                'public_interest_task',
                'archiving_research_statistics',
                'legal_claims',
                'public_health',
                'occupational_medicine',
                'manifestly_unfounded',
                'excessive',
                'dpa_2018',
              ]),
              rationale: z.string(),
              feeBasis: z.string().optional(),
              feeAmount: z.string().optional(),
              appliedAt: z.string().datetime({ offset: true }).optional(),
            })
            .passthrough()
        ),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const ExemptionApply = z
  .object({
    exemptionType: z.enum([
      'freedom_of_expression',
      'legal_obligation',
      'public_interest_task',
      'archiving_research_statistics',
      'legal_claims',
      'public_health',
      'occupational_medicine',
      'manifestly_unfounded',
      'excessive',
      'dpa_2018',
    ]),
    rationale: z.string().min(1),
    feeBasis: z.string().optional(),
    feeAmount: z.string().optional(),
  })
  .passthrough();
const ExemptionRecordResponse = z
  .object({
    data: z
      .object({
        exemptionId: z.string().regex(/^exm_[0-9A-HJKMNP-TV-Z]{26}$/),
        caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
        exemptionType: z.enum([
          'freedom_of_expression',
          'legal_obligation',
          'public_interest_task',
          'archiving_research_statistics',
          'legal_claims',
          'public_health',
          'occupational_medicine',
          'manifestly_unfounded',
          'excessive',
          'dpa_2018',
        ]),
        rationale: z.string(),
        feeBasis: z.string().optional(),
        feeAmount: z.string().optional(),
        appliedAt: z.string().datetime({ offset: true }).optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();

export const schemas: any = {
  submitGroundAssessment_Body,
  applyExemption_Body,
  CaseId,
  Problem,
  AssessmentId,
  Article17Ground,
  AssessmentOutcome,
  GroundAssessment,
  ResponseMeta,
  GroundAssessmentResponse,
  GroundAssessmentSubmit,
  ExemptionId,
  ExemptionType,
  ExemptionRecord,
  ExemptionListResponse,
  ExemptionApply,
  ExemptionRecordResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/erasure-cases/:caseId/assessment',
    alias: 'getGroundAssessment',
    requestFormat: 'json',
    parameters: [
      {
        name: 'caseId',
        type: 'Path',
        schema: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            assessmentId: z.string().regex(/^asm_[0-9A-HJKMNP-TV-Z]{26}$/),
            caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
            rightApplies: z.boolean(),
            grounds: z.array(
              z.enum([
                'no_longer_necessary',
                'consent_withdrawn',
                'legitimate_interest_objection',
                'marketing_objection',
                'unlawful',
                'legal_obligation',
                'child_iss',
              ])
            ),
            outcome: z.enum(['erase', 'refuse', 'escalate_legal']),
            childWeightRationale: z.string(),
            notes: z.string().optional(),
            recordedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/erasure-cases/:caseId/assessment',
    alias: 'submitGroundAssessment',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: submitGroundAssessment_Body,
      },
      {
        name: 'caseId',
        type: 'Path',
        schema: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            assessmentId: z.string().regex(/^asm_[0-9A-HJKMNP-TV-Z]{26}$/),
            caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
            rightApplies: z.boolean(),
            grounds: z.array(
              z.enum([
                'no_longer_necessary',
                'consent_withdrawn',
                'legitimate_interest_objection',
                'marketing_objection',
                'unlawful',
                'legal_obligation',
                'child_iss',
              ])
            ),
            outcome: z.enum(['erase', 'refuse', 'escalate_legal']),
            childWeightRationale: z.string(),
            notes: z.string().optional(),
            recordedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/erasure-cases/:caseId/exemptions',
    alias: 'listExemptions',
    requestFormat: 'json',
    parameters: [
      {
        name: 'caseId',
        type: 'Path',
        schema: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  exemptionId: z.string().regex(/^exm_[0-9A-HJKMNP-TV-Z]{26}$/),
                  caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
                  exemptionType: z.enum([
                    'freedom_of_expression',
                    'legal_obligation',
                    'public_interest_task',
                    'archiving_research_statistics',
                    'legal_claims',
                    'public_health',
                    'occupational_medicine',
                    'manifestly_unfounded',
                    'excessive',
                    'dpa_2018',
                  ]),
                  rationale: z.string(),
                  feeBasis: z.string().optional(),
                  feeAmount: z.string().optional(),
                  appliedAt: z.string().datetime({ offset: true }).optional(),
                })
                .passthrough()
            ),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/erasure-cases/:caseId/exemptions',
    alias: 'applyExemption',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: applyExemption_Body,
      },
      {
        name: 'caseId',
        type: 'Path',
        schema: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            exemptionId: z.string().regex(/^exm_[0-9A-HJKMNP-TV-Z]{26}$/),
            caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
            exemptionType: z.enum([
              'freedom_of_expression',
              'legal_obligation',
              'public_interest_task',
              'archiving_research_statistics',
              'legal_claims',
              'public_health',
              'occupational_medicine',
              'manifestly_unfounded',
              'excessive',
              'dpa_2018',
            ]),
            rationale: z.string(),
            feeBasis: z.string().optional(),
            feeAmount: z.string().optional(),
            appliedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
