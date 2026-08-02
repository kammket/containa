'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';

import { StoreProvider } from '@/lib/store';
import { ToastProvider } from '@/components/ui/toast';

/**
 * Client-Provider. TanStack Query verwaltet die dynamischen API-Daten
 * (Bestand, Konto, Bestellungen); der Katalog selbst kommt statisch aus dem
 * Build und braucht keinen Cache.
 */
export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            gcTime: 5 * 60_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <ToastProvider>{children}</ToastProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
}
