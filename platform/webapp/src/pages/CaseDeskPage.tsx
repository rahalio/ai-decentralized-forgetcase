import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChildWeightBanner, SlaClockChip } from '@/components/desk/DeskChrome';
import { casesService } from '@/services/domains/cases/cases.service';

type CaseRow = {
  caseId: string;
  status: string;
  channel: string;
  dueAt?: string;
  childDataWeight?: boolean;
  idPaused?: boolean;
  extended?: boolean;
  groundOutcome?: string;
  backupStatus?: string;
};

export function CaseDeskPage() {
  const [cases, setCases] = useState<CaseRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await casesService.listErasureCases({ limit: '50' });
        const items = (data?.items ?? data?.data?.items ?? []) as CaseRow[];
        if (!cancelled) setCases(items);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : String(e));
          setCases([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const overdue = cases.filter((c) => c.dueAt && new Date(c.dueAt) < new Date() && !c.idPaused);
  const child = cases.filter((c) => c.childDataWeight);

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'end' }}>
        <div>
          <h1>Case desk</h1>
          <p style={{ margin: '6px 0 0', color: 'var(--color-steel)' }}>
            Which erasure cases breach the calendar-month clock?
          </p>
        </div>
        <Link
          to="/intake"
          style={{
            background: 'var(--color-docket)',
            color: 'var(--color-brand)',
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          Start verbal intake
        </Link>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {[
          ['Overdue', overdue.length, 'var(--color-clock-critical)'],
          ['Open', cases.length, 'var(--color-clock)'],
          ['ID-paused', cases.filter((c) => c.idPaused).length, 'var(--color-steel)'],
          ['Child-weight', child.length, 'var(--color-child)'],
        ].map(([label, value, color]) => (
          <div
            key={String(label)}
            style={{
              background: 'rgba(255,255,255,0.55)',
              border: '1px solid var(--color-rule)',
              borderRadius: 'var(--radius-md)',
              padding: 14,
            }}
          >
            <div style={{ fontSize: 12, color: 'var(--color-steel)' }}>{label}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: String(color) }}>
              {value as number}
            </div>
          </div>
        ))}
      </div>

      {child.length ? (
        <ChildWeightBanner>
          {child.length} case(s) need heightened review — open the child-weight queue.
        </ChildWeightBanner>
      ) : null}

      {loading ? <p>Loading desk…</p> : null}
      {error ? (
        <p style={{ color: 'var(--color-clock-critical)' }}>
          API unavailable ({error}). Desk will populate when the API is running.
        </p>
      ) : null}

      {!loading && !cases.length && !error ? (
        <p>No open erasure cases — intake still available.</p>
      ) : null}

      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.4)' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--color-rule)' }}>
            <th style={{ padding: 10 }}>Case</th>
            <th>Status</th>
            <th>SLA</th>
            <th>Ground</th>
            <th>Backup</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((c) => (
            <tr key={c.caseId} style={{ borderBottom: '1px solid var(--color-rule)' }}>
              <td style={{ padding: 10 }}>
                <Link to={`/cases/${c.caseId}`} style={{ fontFamily: 'var(--font-mono)' }}>
                  {c.caseId}
                </Link>
                {c.childDataWeight ? (
                  <span style={{ marginLeft: 8, color: 'var(--color-child)', fontSize: 12 }}>child</span>
                ) : null}
              </td>
              <td>{c.status}</td>
              <td>
                <SlaClockChip
                  dueAt={c.dueAt}
                  paused={c.idPaused}
                  extended={c.extended}
                  overdue={!!c.dueAt && new Date(c.dueAt) < new Date() && !c.idPaused}
                />
              </td>
              <td>{c.groundOutcome ?? 'pending'}</td>
              <td>{c.backupStatus ?? 'not_started'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
