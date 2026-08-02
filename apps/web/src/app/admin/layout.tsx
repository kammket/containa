import type { Metadata } from 'next';

import { AdminShell } from '@/components/admin/admin-shell';

export const metadata: Metadata = {
  title: 'Administration – EMC Container',
  // Der Adminbereich darf unter keinen Umständen indexiert werden.
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
