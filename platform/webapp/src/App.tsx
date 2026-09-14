import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from '@/app/AppShell';
import { CaseDeskPage } from '@/pages/CaseDeskPage';
import { VerbalIntakePage } from '@/pages/VerbalIntakePage';
import { CaseWorkspacePage } from '@/pages/CaseWorkspacePage';
import { ChildWeightQueuePage } from '@/pages/ChildWeightQueuePage';
import { BackupQueuePage } from '@/pages/BackupQueuePage';
import { AuditExportPage } from '@/pages/AuditExportPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<CaseDeskPage />} />
          <Route path="intake" element={<VerbalIntakePage />} />
          <Route path="cases/:caseId" element={<CaseWorkspacePage />} />
          <Route path="queues/child-weight" element={<ChildWeightQueuePage />} />
          <Route path="queues/backup" element={<BackupQueuePage />} />
          <Route path="audit" element={<AuditExportPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
