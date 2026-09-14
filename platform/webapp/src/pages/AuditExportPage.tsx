import { useState } from 'react';
import { AuditPackExport } from '@/components/audit/AuditPackExport';
import { casesService } from '@/services/domains/cases/cases.service';

export function AuditExportPage() {
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <h1>DPO audit export</h1>
      <AuditPackExport
        onExport={async (includeIdMaterials) => {
          try {
            const pack = await casesService.createExport({ includeIdMaterials });
            setResult(pack);
            setError(null);
          } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
          }
        }}
      />
      {error ? <p style={{ color: 'var(--color-clock-critical)' }}>{error}</p> : null}
      {result ? (
        <pre style={{ background: 'rgba(0,0,0,0.04)', padding: 12 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      ) : null}
    </div>
  );
}
