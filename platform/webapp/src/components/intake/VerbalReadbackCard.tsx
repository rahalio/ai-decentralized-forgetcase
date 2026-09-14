import { useState } from 'react';

type Props = {
  summary: string;
  onConfirm: () => void;
  onChangeSummary: (value: string) => void;
};

export function VerbalReadbackCard({ summary, onConfirm, onChangeSummary }: Props) {
  const [confirmed, setConfirmed] = useState(false);
  return (
    <div
      style={{
        background: 'var(--color-paper)',
        border: '1px solid var(--color-rule)',
        borderRadius: 'var(--radius-md)',
        padding: 16,
        display: 'grid',
        gap: 12,
      }}
    >
      <h3 style={{ margin: 0 }}>Read-back</h3>
      <p style={{ margin: 0, color: 'var(--color-steel)', fontSize: 13 }}>
        Confirm the request in plain language — the subject need not say “Article 17”.
      </p>
      <textarea
        value={summary}
        onChange={(e) => onChangeSummary(e.target.value)}
        rows={4}
        style={{ width: '100%' }}
      />
      <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
        />
        I read this back and the requester confirmed
      </label>
      <button type="button" disabled={!confirmed || !summary.trim()} onClick={onConfirm}>
        Confirm and create case
      </button>
    </div>
  );
}
