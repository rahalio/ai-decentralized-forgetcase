import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const extendSlaClock_Body = z
  .object({
    reason: z.enum(['complex', 'multiple_requests']),
    additionalMonths: z.number().int().gte(1).lte(2).optional().default(2),
    noticeDraft: z.string().optional(),
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
const SlaClock = z
  .object({
    caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
    receivedAt: z.string().datetime({ offset: true }),
    clockStartAt: z.string().datetime({ offset: true }),
    dueAt: z.string().datetime({ offset: true }),
    operationalTargetDueAt: z.string().datetime({ offset: true }).optional(),
    paused: z.boolean(),
    pausedAt: z.string().datetime({ offset: true }).optional(),
    extensionApplied: z.boolean(),
    extensionReason: z.enum(['complex', 'multiple_requests']).optional(),
    extensionNoticeDueAt: z.string().datetime({ offset: true }).optional(),
    additionalMonths: z.number().int().lte(2).optional(),
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
const SlaClockResponse = z
  .object({
    data: z
      .object({
        caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
        receivedAt: z.string().datetime({ offset: true }),
        clockStartAt: z.string().datetime({ offset: true }),
        dueAt: z.string().datetime({ offset: true }),
        operationalTargetDueAt: z
          .string()
          .datetime({ offset: true })
          .optional(),
        paused: z.boolean(),
        pausedAt: z.string().datetime({ offset: true }).optional(),
        extensionApplied: z.boolean(),
        extensionReason: z.enum(['complex', 'multiple_requests']).optional(),
        extensionNoticeDueAt: z.string().datetime({ offset: true }).optional(),
        additionalMonths: z.number().int().lte(2).optional(),
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
const SlaExtensionRequest = z
  .object({
    reason: z.enum(['complex', 'multiple_requests']),
    additionalMonths: z.number().int().gte(1).lte(2).optional().default(2),
    noticeDraft: z.string().optional(),
  })
  .passthrough();
const IdentityChallengeRequest = z
  .object({ proportionalityNote: z.string().min(1) })
  .passthrough();
const ChallengeId = z.string();
const IdentityChallengeStatus = z.enum(['pending', 'satisfied', 'withdrawn']);
const IdentityChallenge = z
  .object({
    challengeId: z.string().regex(/^idc_[0-9A-HJKMNP-TV-Z]{26}$/),
    caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
    requestedAt: z.string().datetime({ offset: true }),
    status: z.enum(['pending', 'satisfied', 'withdrawn']),
    proportionalityNote: z.string().optional(),
    satisfiedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const IdentityChallengeResponse = z
  .object({
    data: z
      .object({
        challengeId: z.string().regex(/^idc_[0-9A-HJKMNP-TV-Z]{26}$/),
        caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
        requestedAt: z.string().datetime({ offset: true }),
        status: z.enum(['pending', 'satisfied', 'withdrawn']),
        proportionalityNote: z.string().optional(),
        satisfiedAt: z.string().datetime({ offset: true }).optional(),
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
const IdentityChallengeSatisfy = z
  .object({ note: z.string() })
  .partial()
  .passthrough();

export const schemas: any = {
  extendSlaClock_Body,
  CaseId,
  Problem,
  SlaClock,
  ResponseMeta,
  SlaClockResponse,
  SlaExtensionRequest,
  IdentityChallengeRequest,
  ChallengeId,
  IdentityChallengeStatus,
  IdentityChallenge,
  IdentityChallengeResponse,
  IdentityChallengeSatisfy,
};

const endpoints = makeApi([
  {
    method: 'post',
    path: '/v1/erasure-cases/:caseId/identity-challenge',
    alias: 'requestIdentityChallenge',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z
          .object({ proportionalityNote: z.string().min(1) })
          .passthrough(),
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
            challengeId: z.string().regex(/^idc_[0-9A-HJKMNP-TV-Z]{26}$/),
            caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
            requestedAt: z.string().datetime({ offset: true }),
            status: z.enum(['pending', 'satisfied', 'withdrawn']),
            proportionalityNote: z.string().optional(),
            satisfiedAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'post',
    path: '/v1/erasure-cases/:caseId/identity-challenge/satisfy',
    alias: 'satisfyIdentityChallenge',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z
          .object({ note: z.string() })
          .partial()
          .passthrough()
          .optional(),
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
            caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
            receivedAt: z.string().datetime({ offset: true }),
            clockStartAt: z.string().datetime({ offset: true }),
            dueAt: z.string().datetime({ offset: true }),
            operationalTargetDueAt: z
              .string()
              .datetime({ offset: true })
              .optional(),
            paused: z.boolean(),
            pausedAt: z.string().datetime({ offset: true }).optional(),
            extensionApplied: z.boolean(),
            extensionReason: z
              .enum(['complex', 'multiple_requests'])
              .optional(),
            extensionNoticeDueAt: z
              .string()
              .datetime({ offset: true })
              .optional(),
            additionalMonths: z.number().int().lte(2).optional(),
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
    path: '/v1/erasure-cases/:caseId/sla',
    alias: 'getSlaClock',
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
            caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
            receivedAt: z.string().datetime({ offset: true }),
            clockStartAt: z.string().datetime({ offset: true }),
            dueAt: z.string().datetime({ offset: true }),
            operationalTargetDueAt: z
              .string()
              .datetime({ offset: true })
              .optional(),
            paused: z.boolean(),
            pausedAt: z.string().datetime({ offset: true }).optional(),
            extensionApplied: z.boolean(),
            extensionReason: z
              .enum(['complex', 'multiple_requests'])
              .optional(),
            extensionNoticeDueAt: z
              .string()
              .datetime({ offset: true })
              .optional(),
            additionalMonths: z.number().int().lte(2).optional(),
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
    path: '/v1/erasure-cases/:caseId/sla/extension',
    alias: 'extendSlaClock',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: extendSlaClock_Body,
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
            caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
            receivedAt: z.string().datetime({ offset: true }),
            clockStartAt: z.string().datetime({ offset: true }),
            dueAt: z.string().datetime({ offset: true }),
            operationalTargetDueAt: z
              .string()
              .datetime({ offset: true })
              .optional(),
            paused: z.boolean(),
            pausedAt: z.string().datetime({ offset: true }).optional(),
            extensionApplied: z.boolean(),
            extensionReason: z
              .enum(['complex', 'multiple_requests'])
              .optional(),
            extensionNoticeDueAt: z
              .string()
              .datetime({ offset: true })
              .optional(),
            additionalMonths: z.number().int().lte(2).optional(),
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
