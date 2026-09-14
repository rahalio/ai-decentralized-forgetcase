import type { CSSProperties, ReactNode } from 'react';

const chipBase: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '4px 10px',
  borderRadius: 'var(--radius-sm)',
  fontFamily: 'var(--font-mono)',
  fontSize: 12,
  transition: 'background var(--motion-clock), color var(--motion-clock)',
};

type Props = {
  dueAt?: string;
  paused?: boolean;
  overdue?: boolean;
  extended?: boolean;
};

export function SlaClockChip({ dueAt, paused, overdue, extended }: Props) {
  const bg = paused
    ? 'rgba(107,117,128,0.25)'
    : overdue
      ? 'rgba(179,59,46,0.2)'
      : extended
        ? 'rgba(196,122,44,0.2)'
        : 'rgba(47,111,94,0.15)';
  const color = overdue
    ? 'var(--color-clock-critical)'
    : paused
      ? 'var(--color-steel)'
      : 'var(--color-clock)';
  return (
    <span style={{ ...chipBase, background: bg, color }} title="SLA clock">
      {paused ? 'ID-paused' : overdue ? 'Overdue' : extended ? 'Extended' : 'On clock'}
      {dueAt ? ` · ${new Date(dueAt).toLocaleDateString()}` : null}
    </span>
  );
}

export function ChildWeightBanner({ children }: { children?: ReactNode }) {
  return (
    <div
      style={{
        background: 'rgba(61,79,140,0.12)',
        borderLeft: '3px solid var(--color-child)',
        padding: '10px 14px',
        borderRadius: 'var(--radius-sm)',
        color: 'var(--color-child)',
        fontSize: 14,
      }}
    >
      <strong>Child-weight review</strong>
      {children ? <div style={{ marginTop: 4, color: 'var(--color-ink)' }}>{children}</div> : null}
    </div>
  );
}

export function IdPauseBanner({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div
      style={{
        background: 'var(--color-docket-panel)',
        color: 'var(--color-brand)',
        padding: '12px 16px',
        borderRadius: 'var(--radius-md)',
        transition: `opacity var(--motion-pause)`,
      }}
    >
      Compliance clock paused pending proportionate identity verification.
    </div>
  );
}

export function ForgetcaseStamp() {
  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily: 'var(--font-display)',
        fontSize: 13,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--color-brand)',
        border: '1px solid var(--color-brand)',
        padding: '2px 8px',
        borderRadius: 'var(--radius-sm)',
        transition: `transform var(--motion-stamp)`,
      }}
    >
      Forgetcase
    </span>
  );
}
