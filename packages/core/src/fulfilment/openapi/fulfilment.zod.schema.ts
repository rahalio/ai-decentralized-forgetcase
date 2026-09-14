import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createBackupBeyondUseTask_Body = z
  .object({
    caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
    backupSystem: z.string().min(1),
  })
  .passthrough();
const completeBackupBeyondUseTask_Body = z
  .object({
    beyondUseConfirmed: z.boolean(),
    overwriteScheduledAt: z.string().datetime({ offset: true }).optional(),
    subjectWording: z.string().optional(),
    naJustification: z.string().optional(),
  })
  .passthrough();
const createRecipientNotice_Body = z
  .object({
    recipientKind: z.enum([
      'controller',
      'processor',
      'authorised_person',
      'online_copy',
    ]),
    recipientLabel: z.string().optional(),
    publicUrl: z.string().url().optional(),
    informIndividualIfAsked: z.boolean().optional().default(true),
  })
  .passthrough();
const updateRecipientNotice_Body = z
  .object({
    status: z.enum(['pending', 'sent', 'impossible', 'disproportionate']),
    disproportionateRationale: z.string().optional(),
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
const LiveTaskId = z.string();
const LiveTaskStatus = z.enum(['queued', 'done', 'blocked']);
const LiveErasureTask = z
  .object({
    taskId: z.string().regex(/^lvt_[0-9A-HJKMNP-TV-Z]{26}$/),
    caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
    systemName: z.string(),
    status: z.enum(['queued', 'done', 'blocked']),
    evidenceNote: z.string().optional(),
    blockedReason: z.string().optional(),
    completedAt: z.string().datetime({ offset: true }).optional(),
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
const LiveErasureTaskListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              taskId: z.string().regex(/^lvt_[0-9A-HJKMNP-TV-Z]{26}$/),
              caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
              systemName: z.string(),
              status: z.enum(['queued', 'done', 'blocked']),
              evidenceNote: z.string().optional(),
              blockedReason: z.string().optional(),
              completedAt: z.string().datetime({ offset: true }).optional(),
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
const LiveErasureTaskCreate = z
  .object({ systemName: z.string().min(1) })
  .passthrough();
const LiveErasureTaskResponse = z
  .object({
    data: z
      .object({
        taskId: z.string().regex(/^lvt_[0-9A-HJKMNP-TV-Z]{26}$/),
        caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
        systemName: z.string(),
        status: z.enum(['queued', 'done', 'blocked']),
        evidenceNote: z.string().optional(),
        blockedReason: z.string().optional(),
        completedAt: z.string().datetime({ offset: true }).optional(),
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
const LiveErasureTaskComplete = z
  .object({ evidenceNote: z.string() })
  .partial()
  .passthrough();
const BackupTaskStatus = z.enum(['open', 'beyond_use', 'overwritten', 'na']);
const BackupTaskId = z.string();
const BackupBeyondUseTask = z
  .object({
    taskId: z.string().regex(/^bku_[0-9A-HJKMNP-TV-Z]{26}$/),
    caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
    backupSystem: z.string(),
    status: z.enum(['open', 'beyond_use', 'overwritten', 'na']),
    overwriteScheduledAt: z.string().datetime({ offset: true }).optional(),
    subjectWording: z.string().optional(),
    naJustification: z.string().optional(),
  })
  .passthrough();
const BackupBeyondUseTaskListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              taskId: z.string().regex(/^bku_[0-9A-HJKMNP-TV-Z]{26}$/),
              caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
              backupSystem: z.string(),
              status: z.enum(['open', 'beyond_use', 'overwritten', 'na']),
              overwriteScheduledAt: z
                .string()
                .datetime({ offset: true })
                .optional(),
              subjectWording: z.string().optional(),
              naJustification: z.string().optional(),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
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
const BackupBeyondUseTaskCreate = z
  .object({
    caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
    backupSystem: z.string().min(1),
  })
  .passthrough();
const BackupBeyondUseTaskResponse = z
  .object({
    data: z
      .object({
        taskId: z.string().regex(/^bku_[0-9A-HJKMNP-TV-Z]{26}$/),
        caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
        backupSystem: z.string(),
        status: z.enum(['open', 'beyond_use', 'overwritten', 'na']),
        overwriteScheduledAt: z.string().datetime({ offset: true }).optional(),
        subjectWording: z.string().optional(),
        naJustification: z.string().optional(),
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
const BackupBeyondUseTaskComplete = z
  .object({
    beyondUseConfirmed: z.boolean(),
    overwriteScheduledAt: z.string().datetime({ offset: true }).optional(),
    subjectWording: z.string().optional(),
    naJustification: z.string().optional(),
  })
  .passthrough();
const NoticeId = z.string();
const RecipientKind = z.enum([
  'controller',
  'processor',
  'authorised_person',
  'online_copy',
]);
const NoticeStatus = z.enum([
  'pending',
  'sent',
  'impossible',
  'disproportionate',
]);
const RecipientNotice = z
  .object({
    noticeId: z.string().regex(/^rcn_[0-9A-HJKMNP-TV-Z]{26}$/),
    caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
    recipientKind: z.enum([
      'controller',
      'processor',
      'authorised_person',
      'online_copy',
    ]),
    recipientLabel: z.string().optional(),
    publicUrl: z.string().url().optional(),
    status: z.enum(['pending', 'sent', 'impossible', 'disproportionate']),
    disproportionateRationale: z.string().optional(),
    informIndividualIfAsked: z.boolean().optional(),
    sentAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const RecipientNoticeListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              noticeId: z.string().regex(/^rcn_[0-9A-HJKMNP-TV-Z]{26}$/),
              caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
              recipientKind: z.enum([
                'controller',
                'processor',
                'authorised_person',
                'online_copy',
              ]),
              recipientLabel: z.string().optional(),
              publicUrl: z.string().url().optional(),
              status: z.enum([
                'pending',
                'sent',
                'impossible',
                'disproportionate',
              ]),
              disproportionateRationale: z.string().optional(),
              informIndividualIfAsked: z.boolean().optional(),
              sentAt: z.string().datetime({ offset: true }).optional(),
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
const RecipientNoticeCreate = z
  .object({
    recipientKind: z.enum([
      'controller',
      'processor',
      'authorised_person',
      'online_copy',
    ]),
    recipientLabel: z.string().optional(),
    publicUrl: z.string().url().optional(),
    informIndividualIfAsked: z.boolean().optional().default(true),
  })
  .passthrough();
const RecipientNoticeResponse = z
  .object({
    data: z
      .object({
        noticeId: z.string().regex(/^rcn_[0-9A-HJKMNP-TV-Z]{26}$/),
        caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
        recipientKind: z.enum([
          'controller',
          'processor',
          'authorised_person',
          'online_copy',
        ]),
        recipientLabel: z.string().optional(),
        publicUrl: z.string().url().optional(),
        status: z.enum(['pending', 'sent', 'impossible', 'disproportionate']),
        disproportionateRationale: z.string().optional(),
        informIndividualIfAsked: z.boolean().optional(),
        sentAt: z.string().datetime({ offset: true }).optional(),
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
const RecipientNoticeUpdate = z
  .object({
    status: z.enum(['pending', 'sent', 'impossible', 'disproportionate']),
    disproportionateRationale: z.string().optional(),
  })
  .passthrough();

export const schemas: any = {
  createBackupBeyondUseTask_Body,
  completeBackupBeyondUseTask_Body,
  createRecipientNotice_Body,
  updateRecipientNotice_Body,
  CaseId,
  Problem,
  LiveTaskId,
  LiveTaskStatus,
  LiveErasureTask,
  ResponseMeta,
  LiveErasureTaskListResponse,
  LiveErasureTaskCreate,
  LiveErasureTaskResponse,
  LiveErasureTaskComplete,
  BackupTaskStatus,
  BackupTaskId,
  BackupBeyondUseTask,
  BackupBeyondUseTaskListResponse,
  BackupBeyondUseTaskCreate,
  BackupBeyondUseTaskResponse,
  BackupBeyondUseTaskComplete,
  NoticeId,
  RecipientKind,
  NoticeStatus,
  RecipientNotice,
  RecipientNoticeListResponse,
  RecipientNoticeCreate,
  RecipientNoticeResponse,
  RecipientNoticeUpdate,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/backup-beyond-use-tasks',
    alias: 'listBackupBeyondUseTasks',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
      {
        name: 'caseId',
        type: 'Query',
        schema: z
          .string()
          .regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['open', 'beyond_use', 'overwritten', 'na']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  taskId: z.string().regex(/^bku_[0-9A-HJKMNP-TV-Z]{26}$/),
                  caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
                  backupSystem: z.string(),
                  status: z.enum(['open', 'beyond_use', 'overwritten', 'na']),
                  overwriteScheduledAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
                  subjectWording: z.string().optional(),
                  naJustification: z.string().optional(),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
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
    ],
  },
  {
    method: 'post',
    path: '/v1/backup-beyond-use-tasks',
    alias: 'createBackupBeyondUseTask',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createBackupBeyondUseTask_Body,
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
            taskId: z.string().regex(/^bku_[0-9A-HJKMNP-TV-Z]{26}$/),
            caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
            backupSystem: z.string(),
            status: z.enum(['open', 'beyond_use', 'overwritten', 'na']),
            overwriteScheduledAt: z
              .string()
              .datetime({ offset: true })
              .optional(),
            subjectWording: z.string().optional(),
            naJustification: z.string().optional(),
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
    ],
  },
  {
    method: 'post',
    path: '/v1/backup-beyond-use-tasks/:taskId/complete',
    alias: 'completeBackupBeyondUseTask',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: completeBackupBeyondUseTask_Body,
      },
      {
        name: 'taskId',
        type: 'Path',
        schema: z.string().regex(/^bku_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            taskId: z.string().regex(/^bku_[0-9A-HJKMNP-TV-Z]{26}$/),
            caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
            backupSystem: z.string(),
            status: z.enum(['open', 'beyond_use', 'overwritten', 'na']),
            overwriteScheduledAt: z
              .string()
              .datetime({ offset: true })
              .optional(),
            subjectWording: z.string().optional(),
            naJustification: z.string().optional(),
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
    path: '/v1/erasure-cases/:caseId/live-erasure-tasks',
    alias: 'listLiveErasureTasks',
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
                  taskId: z.string().regex(/^lvt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
                  systemName: z.string(),
                  status: z.enum(['queued', 'done', 'blocked']),
                  evidenceNote: z.string().optional(),
                  blockedReason: z.string().optional(),
                  completedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/erasure-cases/:caseId/live-erasure-tasks',
    alias: 'createLiveErasureTask',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ systemName: z.string().min(1) }).passthrough(),
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
            taskId: z.string().regex(/^lvt_[0-9A-HJKMNP-TV-Z]{26}$/),
            caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
            systemName: z.string(),
            status: z.enum(['queued', 'done', 'blocked']),
            evidenceNote: z.string().optional(),
            blockedReason: z.string().optional(),
            completedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/erasure-cases/:caseId/recipient-notices',
    alias: 'listRecipientNotices',
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
                  noticeId: z.string().regex(/^rcn_[0-9A-HJKMNP-TV-Z]{26}$/),
                  caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
                  recipientKind: z.enum([
                    'controller',
                    'processor',
                    'authorised_person',
                    'online_copy',
                  ]),
                  recipientLabel: z.string().optional(),
                  publicUrl: z.string().url().optional(),
                  status: z.enum([
                    'pending',
                    'sent',
                    'impossible',
                    'disproportionate',
                  ]),
                  disproportionateRationale: z.string().optional(),
                  informIndividualIfAsked: z.boolean().optional(),
                  sentAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/erasure-cases/:caseId/recipient-notices',
    alias: 'createRecipientNotice',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createRecipientNotice_Body,
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
            noticeId: z.string().regex(/^rcn_[0-9A-HJKMNP-TV-Z]{26}$/),
            caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
            recipientKind: z.enum([
              'controller',
              'processor',
              'authorised_person',
              'online_copy',
            ]),
            recipientLabel: z.string().optional(),
            publicUrl: z.string().url().optional(),
            status: z.enum([
              'pending',
              'sent',
              'impossible',
              'disproportionate',
            ]),
            disproportionateRationale: z.string().optional(),
            informIndividualIfAsked: z.boolean().optional(),
            sentAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/live-erasure-tasks/:taskId/complete',
    alias: 'completeLiveErasureTask',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z
          .object({ evidenceNote: z.string() })
          .partial()
          .passthrough()
          .optional(),
      },
      {
        name: 'taskId',
        type: 'Path',
        schema: z.string().regex(/^lvt_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            taskId: z.string().regex(/^lvt_[0-9A-HJKMNP-TV-Z]{26}$/),
            caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
            systemName: z.string(),
            status: z.enum(['queued', 'done', 'blocked']),
            evidenceNote: z.string().optional(),
            blockedReason: z.string().optional(),
            completedAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'patch',
    path: '/v1/recipient-notices/:noticeId',
    alias: 'updateRecipientNotice',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updateRecipientNotice_Body,
      },
      {
        name: 'noticeId',
        type: 'Path',
        schema: z.string().regex(/^rcn_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            noticeId: z.string().regex(/^rcn_[0-9A-HJKMNP-TV-Z]{26}$/),
            caseId: z.string().regex(/^cas_[0-9A-HJKMNP-TV-Z]{26}$/),
            recipientKind: z.enum([
              'controller',
              'processor',
              'authorised_person',
              'online_copy',
            ]),
            recipientLabel: z.string().optional(),
            publicUrl: z.string().url().optional(),
            status: z.enum([
              'pending',
              'sent',
              'impossible',
              'disproportionate',
            ]),
            disproportionateRationale: z.string().optional(),
            informIndividualIfAsked: z.boolean().optional(),
            sentAt: z.string().datetime({ offset: true }).optional(),
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
