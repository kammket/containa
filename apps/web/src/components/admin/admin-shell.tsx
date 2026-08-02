'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Inbox, LayoutGrid, Loader2, LogOut, Package, ShoppingBag } from 'lucide-react';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { adminApi, adminLogout, restoreSession, type AdminUser } from '@/lib/admin-api';
import { cn } from '@/lib/utils';
import { AdminLogin } from './admin-login';

interface AdminSession {
  user: AdminUser;
  signOut: () => void;
}

const SessionContext = createContext<AdminSession | null>(null);

export function useAdminSession(): AdminSession {
  const session = useContext(SessionContext);
  if (!session) throw new Error('useAdminSession benötigt eine aktive Sitzung');
  return session;
}

const navigation = [
  { href: '/admin', label: 'Overview', icon: LayoutGrid, exact: true },
  { href: '/admin/produkte', label: 'Products', icon: Package },
  { href: '/admin/bestellungen', label: 'Orders', icon: ShoppingBag },
  { href: '/admin/anfragen', label: 'Inquiries', icon: Inbox, badge: 'inquiries' },
];

/**
 * Rahmen des Adminbereichs.
 *
 * Die Sitzung wird beim Laden über das HttpOnly-Refresh-Cookie
 * wiederhergestellt. Solange das läuft, wird weder Login noch Inhalt gezeigt –
 * das verhindert ein Aufblitzen der Anmeldemaske bei bestehender Sitzung.
 */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [checking, setChecking] = useState(true);
  const [openInquiries, setOpenInquiries] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    void restoreSession().then((restored) => {
      setUser(restored);
      setChecking(false);
    });
  }, []);

  useEffect(() => {
    if (!user) return;
    void adminApi.inquiries
      .stats()
      .then((stats) => setOpenInquiries(stats.newTotal))
      .catch(() => undefined);
  }, [user, pathname]);

  const signOut = useCallback(() => {
    void adminLogout().then(() => setUser(null));
  }, []);

  if (checking) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-stone-50">
        <Loader2 className="size-6 animate-spin text-stone-400" aria-hidden />
        <span className="sr-only">Checking session …</span>
      </div>
    );
  }

  if (!user) return <AdminLogin onSuccess={setUser} />;

  return (
    <SessionContext.Provider value={{ user, signOut }}>
      <div translate="no" className="flex min-h-dvh bg-stone-50">
        {/* Seitennavigation */}
        <aside className="hidden w-60 shrink-0 flex-col border-r border-stone-200 bg-white lg:flex">
          <div className="border-b border-stone-200 px-5 py-4">
            <p className="font-display text-base font-bold text-navy-950">
              EMC<span className="text-accent-600"> Container</span>
            </p>
            <p className="mt-0.5 text-xs text-stone-500">Administration</p>
          </div>

          <nav aria-label="Administration" className="flex-1 p-3">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        active
                          ? 'bg-navy-900 text-white'
                          : 'text-stone-700 hover:bg-stone-100 hover:text-navy-900',
                      )}
                    >
                      <item.icon className="size-4 shrink-0" aria-hidden />
                      <span className="flex-1">{item.label}</span>
                      {item.badge === 'inquiries' && openInquiries > 0 && (
                        <span
                          className={cn(
                            'rounded-full px-1.5 py-0.5 text-2xs font-bold',
                            active ? 'bg-white/20 text-white' : 'bg-accent-600 text-white',
                          )}
                        >
                          {openInquiries}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-stone-200 p-3">
            <p className="px-3 pb-2 text-xs text-stone-500">
              Signed in as
              <br />
              <span className="font-medium text-navy-900">{user.email}</span>
            </p>
            <Button variant="ghost" size="sm" onClick={signOut} className="w-full justify-start">
              <LogOut aria-hidden />
              Sign out
            </Button>
            <Link
              href="/"
              className="mt-1 block rounded-lg px-3 py-2 text-sm text-stone-500 transition-colors hover:bg-stone-100 hover:text-navy-900"
            >
              Go to shop
            </Link>
          </div>
        </aside>

        {/* Mobile Navigation */}
        <nav
          aria-label="Administration"
          className="fixed inset-x-0 bottom-0 z-40 flex border-t border-stone-200 bg-white lg:hidden"
        >
          {navigation.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative flex flex-1 flex-col items-center gap-1 py-2.5 text-2xs font-medium transition-colors',
                  active ? 'text-accent-700' : 'text-stone-500',
                )}
              >
                <item.icon className="size-5" aria-hidden />
                {item.label}
                {item.badge === 'inquiries' && openInquiries > 0 && (
                  <span className="absolute top-1.5 right-1/4 size-2 rounded-full bg-accent-600" />
                )}
              </Link>
            );
          })}
        </nav>

        <main className="min-w-0 flex-1 pb-20 lg:pb-0">{children}</main>
      </div>
    </SessionContext.Provider>
  );
}
