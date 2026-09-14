import { useMemo, useState } from 'react';

const GROUNDS = [
  { id: 'no_longer_necessary', label: 'No longer necessary' },
  { id: 'consent_withdrawn', label: 'Consent withdrawn' },
  { id: 'legitimate_interest_objection', label: 'LI objection (no override)' },
  { id: 'marketing_objection', label: 'Direct marketing objection' },
  { id: 'unlawful', label: 'Unlawful processing' },
  { id: 'legal_obligation', label: 'Legal obligation to erase' },
  { id: 'child_iss', label: 'Child information-society services' },
] as const;

const EXEMPTIONS = [
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
] as const;

type Props = {
  onSubmit: (payload: {
    rightApplies: boolean;
    grounds: string[];
    outcome: 'erase' | 'refuse' | 'escalate_legal';
    childWeightRationale: string;
    exemptionType?: string;
    exemptionRationale?: string;
  }) => void;
  blocked?: boolean;
};

export function GroundExemptionChecklist({ onSubmit, blocked }: Props) {
  const [grounds, setGrounds] = useState<string[]>([]);
  const [outcome, setOutcome] = useState<'erase' | 'refuse' | 'escalate_legal'>('erase');
  const [childWeightRationale, setChildWeightRationale] = useState('');
  const [exemptionType, setExemptionType] = useState('');
  const [exemptionRationale, setExemptionRationale] = useState('');

  const canConfirm = useMemo(
    () => grounds.length > 0 && !(outcome === 'erase' && exemptionType),
    [grounds, outcome, exemptionType],
  );

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <section>
        <h3>Article 17 grounds</h3>
        <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
          {GROUNDS.map((g) => (
            <label key={g.id} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={grounds.includes(g.id)}
                onChange={(e) =>
                  setGrounds((prev) =>
                    e.target.checked ? [...prev, g.id] : prev.filter((x) => x !== g.id),
                  )
                }
              />
              {g.label}
            </label>
          ))}
        </div>
      </section>
      <section>
        <h3>Child-weight rationale</h3>
        <textarea
          value={childWeightRationale}
          onChange={(e) => setChildWeightRationale(e.target.value)}
          rows={3}
          style={{ width: '100%', marginTop: 8 }}
          placeholder="Including adult subjects whose data was collected as children online"
        />
      </section>
      <section>
        <h3>Outcome</h3>
        <select value={outcome} onChange={(e) => setOutcome(e.target.value as typeof outcome)}>
          <option value="erase">Erase</option>
          <option value="refuse">Refuse</option>
          <option value="escalate_legal">Escalate legal</option>
        </select>
      </section>
      <section>
        <h3>Exemption (blocks erase)</h3>
        <select value={exemptionType} onChange={(e) => setExemptionType(e.target.value)}>
          <option value="">None</option>
          {EXEMPTIONS.map((x) => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
        </select>
        {exemptionType ? (
          <textarea
            value={exemptionRationale}
            onChange={(e) => setExemptionRationale(e.target.value)}
            rows={2}
            style={{ width: '100%', marginTop: 8 }}
            placeholder="Rationale / fee basis if unfounded or excessive"
          />
        ) : null}
      </section>
      <button
        type="button"
        disabled={blocked || !canConfirm}
        onClick={() =>
          onSubmit({
            rightApplies: outcome === 'erase',
            grounds,
            outcome,
            childWeightRationale,
            exemptionType: exemptionType || undefined,
            exemptionRationale: exemptionRationale || undefined,
          })
        }
      >
        Confirm assessment
      </button>
      {!canConfirm ? (
        <p style={{ color: 'var(--color-clock-critical)', margin: 0, fontSize: 13 }}>
          Select at least one ground. Erase is blocked while an exemption is selected.
        </p>
      ) : null}
    </div>
  );
}
