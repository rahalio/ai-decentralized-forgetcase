import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VerbalReadbackCard } from '@/components/intake/VerbalReadbackCard';
import { casesService } from '@/services/domains/cases/cases.service';

export function VerbalIntakePage() {
  const navigate = useNavigate();
  const [subjectRef, setSubjectRef] = useState('');
  const [summary, setSummary] = useState('');
  const [childHint, setChildHint] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function createCase() {
    if (!subjectRef.trim()) {
      setError('Identity contact / subject reference is required.');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const created = await casesService.createVerbal({
        subjectRef,
        requestSummary: summary,
        childRelatedHint: childHint,
        readbackConfirmed: true,
      });
      const caseId = created?.caseId ?? created?.data?.caseId;
      navigate(caseId ? `/cases/${caseId}` : '/');
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ display: 'grid', gap: 20, maxWidth: 640 }}>
      <header>
        <h1>Verbal intake</h1>
        <p style={{ margin: '6px 0 0', color: 'var(--color-steel)' }}>
          Log a forget request in under two minutes — no Article 17 vocabulary required.
        </p>
      </header>
      <label style={{ display: 'grid', gap: 6 }}>
        Who / contact reference
        <input value={subjectRef} onChange={(e) => setSubjectRef(e.target.value)} />
      </label>
      <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input type="checkbox" checked={childHint} onChange={(e) => setChildHint(e.target.checked)} />
        Child-related data hint
      </label>
      <VerbalReadbackCard
        summary={summary}
        onChangeSummary={setSummary}
        onConfirm={() => {
          if (!busy) void createCase();
        }}
      />
      {error ? <p style={{ color: 'var(--color-clock-critical)' }}>{error}</p> : null}
    </div>
  );
}
