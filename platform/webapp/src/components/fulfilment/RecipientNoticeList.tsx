type Notice = {
  noticeId: string;
  recipientKind: string;
  recipientLabel?: string;
  status: string;
  publicUrl?: string;
};

export function RecipientNoticeList({
  notices,
  onUpdate,
}: {
  notices: Notice[];
  onUpdate: (noticeId: string, status: string) => void;
}) {
  if (!notices.length) {
    return <p style={{ color: 'var(--color-steel)' }}>No disclosed recipients — attest “none disclosed” on close.</p>;
  }
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {notices.map((n) => (
        <li
          key={n.noticeId}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 12,
            padding: '10px 0',
            borderBottom: '1px solid var(--color-rule)',
          }}
        >
          <div>
            <strong>{n.recipientLabel || n.recipientKind}</strong>
            <div style={{ fontSize: 12, color: 'var(--color-steel)' }}>
              {n.recipientKind} · {n.status}
              {n.publicUrl ? ` · ${n.publicUrl}` : ''}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button type="button" onClick={() => onUpdate(n.noticeId, 'sent')}>
              Sent
            </button>
            <button type="button" onClick={() => onUpdate(n.noticeId, 'disproportionate')}>
              Disproportionate
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
