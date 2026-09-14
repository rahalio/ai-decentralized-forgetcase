import { useMemo, useState } from 'react';

type Props = {
  templateType: 'completion' | 'refusal' | 'extension_notice';
  onSend: (payload: {
    templateType: string;
    body: string;
    includesIcoComplaintRights: boolean;
    includesJudicialRemedy: boolean;
    includesReasons: boolean;
    includesBackupHonesty: boolean;
  }) => void;
};

export function RefusalClauseGuard({ templateType, onSend }: Props) {
  const [body, setBody] = useState('');
  const [reasons, setReasons] = useState(false);
  const [ico, setIco] = useState(false);
  const [judicial, setJudicial] = useState(false);
  const [backup, setBackup] = useState(true);

  const blocked = useMemo(() => {
    if (templateType === 'refusal') return !(reasons && ico && judicial);
    if (templateType === 'completion') return !(ico && judicial && backup);
    return !(ico && judicial);
  }, [templateType, reasons, ico, judicial, backup]);

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={6}
        placeholder="Letter body"
        style={{ width: '100%' }}
      />
      <label>
        <input type="checkbox" checked={reasons} onChange={(e) => setReasons(e.target.checked)} /> Reasons
        included
      </label>
      <label>
        <input type="checkbox" checked={ico} onChange={(e) => setIco(e.target.checked)} /> ICO complaint
        rights
      </label>
      <label>
        <input
          type="checkbox"
          checked={judicial}
          onChange={(e) => setJudicial(e.target.checked)}
        />{' '}
        Judicial remedy notice
      </label>
      <label>
        <input type="checkbox" checked={backup} onChange={(e) => setBackup(e.target.checked)} /> Backup
        honesty paragraph
      </label>
      <button
        type="button"
        disabled={blocked}
        onClick={() =>
          onSend({
            templateType,
            body,
            includesIcoComplaintRights: ico,
            includesJudicialRemedy: judicial,
            includesReasons: reasons,
            includesBackupHonesty: backup,
          })
        }
      >
        Queue letter
      </button>
      {blocked ? (
        <p style={{ color: 'var(--color-clock-critical)', margin: 0, fontSize: 13 }}>
          Mandatory clauses must be checked before send.
        </p>
      ) : null}
    </div>
  );
}
