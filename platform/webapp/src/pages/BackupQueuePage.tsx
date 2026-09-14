import { useEffect, useState } from 'react';
import { BeyondUseTaskRow } from '@/components/fulfilment/BeyondUseTaskRow';
import { fulfilmentService } from '@/services/domains/fulfilment/fulfilment.service';

export function BackupQueuePage() {
  const [tasks, setTasks] = useState<any[]>([]);

  async function reload() {
    try {
      const data = await fulfilmentService.getBackupBeyondUseTask({ status: 'open' });
      setTasks((data as any)?.items ?? (data as any)?.data?.items ?? []);
    } catch {
      setTasks([]);
    }
  }

  useEffect(() => {
    void reload();
  }, []);

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <h1>Backup beyond-use queue</h1>
      <p style={{ margin: 0, color: 'var(--color-steel)' }}>
        Records owners prove backups are beyond use — equal to live erase.
      </p>
      {!tasks.length ? <p>No open backup tasks.</p> : null}
      {tasks.map((t) => (
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
  );
}
