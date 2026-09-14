import { NavLink, Outlet } from 'react-router-dom';
import { ForgetcaseStamp } from '@/components/desk/DeskChrome';

const nav = [
  { to: '/', label: 'Case desk', end: true },
  { to: '/intake', label: 'Verbal intake' },
  { to: '/queues/child-weight', label: 'Child-weight' },
  { to: '/queues/backup', label: 'Backup queue' },
  { to: '/audit', label: 'DPO audit' },
];

export function AppShell() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: '100vh' }}>
      <aside
        style={{
          background: 'var(--color-docket)',
          color: 'var(--color-brand)',
          padding: '24px 16px',
          borderRight: '1px solid #2a3138',
        }}
      >
        <div style={{ marginBottom: 28 }}>
          <ForgetcaseStamp />
          <p style={{ margin: '10px 0 0', fontSize: 12, color: 'var(--color-steel)' }}>
            Statutory erasure casework
          </p>
        </div>
        <nav style={{ display: 'grid', gap: 6 }}>
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              style={({ isActive }) => ({
                padding: '8px 10px',
                borderRadius: 'var(--radius-sm)',
                background: isActive ? 'var(--color-docket-panel)' : 'transparent',
                color: isActive ? 'var(--color-brand)' : 'var(--color-steel)',
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main
        style={{
          background: `
            radial-gradient(ellipse at top, rgba(232,220,200,0.08), transparent 50%),
            var(--color-paper)
          `,
          color: 'var(--color-ink)',
          padding: '28px 32px',
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
