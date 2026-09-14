import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ChildWeightBanner,
  ForgetcaseStamp,
  IdPauseBanner,
  SlaClockChip,
} from '@/components/desk/DeskChrome';
import { GroundExemptionChecklist } from '@/components/assessment/GroundExemptionChecklist';
import { BeyondUseTaskRow } from '@/components/fulfilment/BeyondUseTaskRow';
import { RecipientNoticeList } from '@/components/fulfilment/RecipientNoticeList';
import { RefusalClauseGuard } from '@/components/correspondence/RefusalClauseGuard';
import { casesService } from '@/services/domains/cases/cases.service';
import { assessmentsService } from '@/services/domains/assessments/assessments.service';
import { slaService } from '@/services/domains/sla/sla.service';
import { fulfilmentService } from '@/services/domains/fulfilment/fulfilment.service';
import { correspondenceService } from '@/services/domains/correspondence/correspondence.service';

const stages = ['Intake', 'Assess', 'SLA', 'Live', 'Backup', 'Notices', 'Letters'] as const;

export function CaseWorkspacePage() {
  const { caseId = '' } = useParams();
  const [stage, setStage] = useState<(typeof stages)[number]>('Assess');
  const [caseData, setCaseData] = useState<Record<string, unknown> | null>(null);
  const [sla, setSla] = useState<Record<string, unknown> | null>(null);
  const [assessment, setAssessment] = useState<Record<string, unknown> | null>(null);
  const [liveTasks, setLiveTasks] = useState<any[]>([]);
  const [backupTasks, setBackupTasks] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  async function reload() {
    if (!caseId) return;
    try {
      const [c, s, a, live, backup, noticeList] = await Promise.all([
        casesService.getErasureCase(caseId).catch(() => null),
        slaService.getSla(caseId).catch(() => null),
        assessmentsService.getAssessment(caseId).catch(() => null),
        fulfilmentService.getLiveErasureTask(caseId).catch(() => ({ items: [] })),
        fulfilmentService.getBackupBeyondUseTask({ caseId }).catch(() => ({ items: [] })),
        fulfilmentService.getRecipientNotice(caseId).catch(() => ({ items: [] })),
      ]);
      setCaseData((c as any)?.caseId ? (c as any) : ((c as any)?.data ?? c));
      setSla((s as any)?.caseId ? (s as any) : ((s as any)?.data ?? s));
      setAssessment((a as any)?.assessmentId ? (a as any) : ((a as any)?.data ?? a));
      setLiveTasks((live as any)?.items ?? (live as any)?.data?.items ?? []);
      setBackupTasks((backup as any)?.items ?? (backup as any)?.data?.items ?? []);
      setNotices((noticeList as any)?.items ?? (noticeList as any)?.data?.items ?? []);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : String(e));
    }
  }

  useEffect(() => {
    void reload();
  }, [caseId]);

  const outcome = (assessment as any)?.outcome as string | undefined;
  const fulfilmentBlocked = !outcome || outcome !== 'erase';
  const idPaused = Boolean((sla as any)?.paused ?? (caseData as any)?.idPaused);

  return (
    <div style={{ display: 'grid', gap: 18 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'start' }}>
        <div style={{ display: 'grid', gap: 8 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <ForgetcaseStamp />
            <h1 style={{ fontSize: 28 }}>{caseId}</h1>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <SlaClockChip
              dueAt={(sla as any)?.dueAt ?? (caseData as any)?.dueAt}
              paused={idPaused}
              extended={Boolean((sla as any)?.extensionApplied)}
            />
            {(caseData as any)?.childDataWeight ? (
              <span style={{ color: 'var(--color-child)', fontSize: 13 }}>Child-weight</span>
            ) : null}
          </div>
        </div>
        <Link to="/">Back to desk</Link>
      </header>

      <IdPauseBanner visible={idPaused} />
      {(caseData as any)?.childDataWeight ? (
        <ChildWeightBanner>Heightened review required before erase or refuse.</ChildWeightBanner>
      ) : null}

      <nav style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {stages.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStage(s)}
            style={{
              background: stage === s ? 'var(--color-docket)' : 'transparent',
              color: stage === s ? 'var(--color-brand)' : 'var(--color-ink)',
              border: '1px solid var(--color-rule)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 10px',
            }}
          >
            {s}
          </button>
        ))}
      </nav>

      {message ? <p style={{ color: 'var(--color-clock)' }}>{message}</p> : null}

      {stage === 'Assess' ? (
        <GroundExemptionChecklist
          onSubmit={async (payload) => {
            await assessmentsService.createAssessment(caseId, {
              rightApplies: payload.rightApplies,
              grounds: payload.grounds,
              outcome: payload.outcome,
              childWeightRationale: payload.childWeightRationale,
            });
            if (payload.exemptionType) {
              await assessmentsService.applyExemption(caseId, {
                exemptionType: payload.exemptionType,
                rationale: payload.exemptionRationale ?? '',
              });
            }
            setMessage('Assessment recorded — fulfilment gated by outcome.');
            await reload();
          }}
        />
      ) : null}

      {stage === 'SLA' ? (
        <div style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
          <h2>SLA clock</h2>
          <pre style={{ background: 'rgba(0,0,0,0.04)', padding: 12, overflow: 'auto' }}>
            {JSON.stringify(sla ?? {}, null, 2)}
          </pre>
          <button
            type="button"
            onClick={async () => {
              await slaService.getIdentityChallenge(caseId, {
                proportionalityNote: 'Proportionate verification of requester identity',
              });
              setMessage('ID challenge issued — clock paused.');
              await reload();
            }}
          >
            Request ID (pause clock)
          </button>
          <button
            type="button"
            onClick={async () => {
              await slaService.getSatisfy(caseId, {});
              setMessage('ID received — clock resumed.');
              await reload();
            }}
          >
            Mark ID received
          </button>
          <button
            type="button"
            onClick={async () => {
              await slaService.getExtension(caseId, { reason: 'complex', additionalMonths: 2 });
              setMessage('Lawful extension filed — send notice inside month one.');
              await reload();
            }}
          >
            File extension
          </button>
        </div>
      ) : null}

      {stage === 'Live' ? (
        <div>
          <h2>Live erasure tasks</h2>
          {fulfilmentBlocked ? (
            <p style={{ color: 'var(--color-clock-critical)' }}>
              Fulfilment blocked until assessment outcome is erase.
            </p>
          ) : (
            <>
              <button
                type="button"
                onClick={async () => {
                  await fulfilmentService.createLiveErasureTask(caseId, { systemName: 'CRM' });
                  await reload();
                }}
              >
                Add CRM erase task
              </button>
              <ul>
                {liveTasks.map((t) => (
                  <li key={t.taskId}>
                    {t.systemName} · {t.status}{' '}
                    <button
                      type="button"
                      onClick={async () => {
                        await fulfilmentService.createComplete(t.taskId, { evidenceNote: 'Deleted' });
                        await reload();
                      }}
                    >
                      Mark erased
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ) : null}

      {stage === 'Backup' ? (
        <div>
          <h2>Backup beyond-use</h2>
          <button
            type="button"
            onClick={async () => {
              await fulfilmentService.createBackupBeyondUseTask({
                caseId,
                backupSystem: 'Nightly snapshot',
              });
              await reload();
            }}
          >
            Add backup task
          </button>
          {backupTasks.map((t) => (
            <BeyondUseTaskRow
              key={t.taskId}
              task={t}
              onComplete={async (id) => {
                await fulfilmentService.completeBackupBeyondUseTask(id, {
                  beyondUseConfirmed: true,
                  overwriteScheduledAt: new Date(Date.now() + 30 * 86400000).toISOString(),
                });
                await reload();
              }}
            />
          ))}
        </div>
      ) : null}

      {stage === 'Notices' ? (
        <div>
          <h2>Recipient notices</h2>
          <button
            type="button"
            onClick={async () => {
              await fulfilmentService.createRecipientNotice(caseId, {
                recipientKind: 'processor',
                recipientLabel: 'Email ESP',
              });
              await reload();
            }}
          >
            Add recipient
          </button>
          <RecipientNoticeList
            notices={notices}
            onUpdate={async (noticeId, status) => {
              await fulfilmentService.updateRecipientNotice(noticeId, {
                status,
                disproportionateRationale:
                  status === 'disproportionate' ? 'Disproportionate effort documented' : undefined,
              });
              await reload();
            }}
          />
        </div>
      ) : null}

      {stage === 'Letters' ? (
        <div>
          <h2>Correspondence</h2>
          <RefusalClauseGuard
            templateType={outcome === 'refuse' ? 'refusal' : 'completion'}
            onSend={async (payload) => {
              await correspondenceService.createCorrespondence(caseId, payload);
              setMessage('Correspondence queued.');
            }}
          />
        </div>
      ) : null}

      {stage === 'Intake' ? (
        <div>
          <h2>Intake summary</h2>
          <pre style={{ background: 'rgba(0,0,0,0.04)', padding: 12 }}>
            {JSON.stringify(caseData ?? {}, null, 2)}
          </pre>
        </div>
      ) : null}
    </div>
  );
}
