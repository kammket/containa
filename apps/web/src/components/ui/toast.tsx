'use client';

import * as ToastPrimitive from '@radix-ui/react-toast';
import { Check, Info, TriangleAlert, X } from 'lucide-react';
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

type ToastVariant = 'success' | 'info' | 'error';

interface ToastItem {
  id: number;
  title: string;
  description?: string;
  variant: ToastVariant;
  action?: { label: string; href: string };
}

interface ToastApi {
  toast: (item: Omit<ToastItem, 'id'>) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

const variantStyles: Record<ToastVariant, { icon: typeof Check; className: string }> = {
  success: { icon: Check, className: 'bg-success-600 text-white' },
  info: { icon: Info, className: 'bg-navy-800 text-white' },
  error: { icon: TriangleAlert, className: 'bg-danger-600 text-white' },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const toast = useCallback((item: Omit<ToastItem, 'id'>) => {
    setItems((prev) => [...prev.slice(-2), { ...item, id: Date.now() + Math.random() }]);
  }, []);

  const api = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={api}>
      <ToastPrimitive.Provider swipeDirection="right" duration={4500}>
        {children}
        {items.map((item) => {
          const { icon: Icon, className } = variantStyles[item.variant];
          return (
            <ToastPrimitive.Root
              key={item.id}
              onOpenChange={(open) => {
                if (!open) setItems((prev) => prev.filter((i) => i.id !== item.id));
              }}
              className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-float data-[state=closed]:animate-[fade-in_0.15s_ease-out_reverse] data-[state=open]:animate-fade-up data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]"
            >
              <span
                className={cn(
                  'flex size-8 shrink-0 items-center justify-center rounded-lg',
                  className,
                )}
              >
                <Icon className="size-4" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <ToastPrimitive.Title className="text-sm font-semibold text-navy-900">
                  {item.title}
                </ToastPrimitive.Title>
                {item.description && (
                  <ToastPrimitive.Description className="mt-0.5 text-sm text-stone-600">
                    {item.description}
                  </ToastPrimitive.Description>
                )}
                {item.action && (
                  <ToastPrimitive.Action asChild altText={item.action.label}>
                    <a
                      href={item.action.href}
                      className="mt-2 inline-block text-sm font-semibold text-accent-700 underline underline-offset-2"
                    >
                      {item.action.label}
                    </a>
                  </ToastPrimitive.Action>
                )}
              </div>
              <ToastPrimitive.Close
                aria-label="Meldung schließen"
                className="shrink-0 cursor-pointer rounded-md p-1 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
              >
                <X className="size-4" aria-hidden />
              </ToastPrimitive.Close>
            </ToastPrimitive.Root>
          );
        })}
        <ToastPrimitive.Viewport className="fixed right-4 bottom-4 z-[95] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2 outline-none" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast muss innerhalb von <ToastProvider> verwendet werden');
  return context;
}
