import { useState } from 'react';

export function AuditPackExport({
  onExport,
}: {
  onExport: (includeIdMaterials: boolean) => void;
}) {
  const [includeId, setIncludeId] = useState(false);
  return (
    <div
      style={{
        background: 'var(--color-paper)',
        border: '1px solid var(--color-rule)',
        borderRadius: 'var(--radius-md)',
        padding: 20,
        display: 'grid',
        gap: 12,
        maxWidth: 520,
      }}
    >
      <h2 style={{ margin: 0 }}>DPO audit export</h2>
      <p style={{ margin: 0, color: 'var(--color-steel)' }}>
        Produce an ICO-ready decision pack. Prefer minimised identity materials.
      </p>
      <label style={{ display: 'flex', gap: 8 }}>
        <input type="checkbox" checked={includeId} onChange={(e) => setIncludeId(e.target.checked)} />
        Include ID materials (investigation protocol only)
      </label>
      {includeId ? (
        <p style={{ color: 'var(--color-clock-critical)', margin: 0, fontSize: 13 }}>
          Warning: ID should be purged when no longer necessary (BR-11).
        </p>
      ) : null}
      <button type="button" onClick={() => onExport(includeId)}>
        Generate pack
      </button>
    </div>
  );
}
