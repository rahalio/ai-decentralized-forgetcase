type Task = {
  taskId: string;
  backupSystem: string;
  status: string;
  overwriteScheduledAt?: string;
};

export function BeyondUseTaskRow({
  task,
  onComplete,
}: {
  task: Task;
  onComplete: (taskId: string) => void;
}) {
  const done = task.status === 'beyond_use' || task.status === 'na';
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 12,
        padding: '12px 0',
        borderBottom: '1px solid var(--color-rule)',
      }}
    >
      <div>
        <div style={{ fontWeight: 600 }}>{task.backupSystem}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-steel)' }}>
          {task.taskId} · {task.status}
          {task.overwriteScheduledAt
            ? ` · overwrite ${new Date(task.overwriteScheduledAt).toLocaleDateString()}`
            : ''}
        </div>
      </div>
      <button
        type="button"
        disabled={done}
        style={{
          background: done ? 'var(--color-beyond)' : 'var(--color-docket)',
          color: 'var(--color-brand)',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          padding: '6px 12px',
        }}
        onClick={() => onComplete(task.taskId)}
      >
        {done ? 'Beyond use' : 'Mark beyond use'}
      </button>
    </div>
  );
}
