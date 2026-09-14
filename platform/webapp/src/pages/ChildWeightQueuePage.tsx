import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChildWeightBanner } from '@/components/desk/DeskChrome';
import { casesService } from '@/services/domains/cases/cases.service';

export function ChildWeightQueuePage() {
  const [cases, setCases] = useState<any[]>([]);
  useEffect(() => {
    void casesService
      .listErasureCases({ childDataWeight: 'true' })
      .then((data) => setCases((data as any)?.items ?? (data as any)?.data?.items ?? []))
      .catch(() => setCases([]));
  }, []);

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <h1>Child-weight escalations</h1>
      <ChildWeightBanner>
        Cases involving child-collected data (including adult subjects) for heightened review.
      </ChildWeightBanner>
      {!cases.length ? <p>No child-weight backlog.</p> : null}
      <ul>
        {cases.map((c) => (
          <li key={c.caseId}>
            <Link to={`/cases/${c.caseId}`}>{c.caseId}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
