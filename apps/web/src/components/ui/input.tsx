import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        'h-11 w-full rounded-xl border border-stone-300 bg-white px-3.5 text-sm text-navy-900 transition-colors',
        'placeholder:text-stone-400',
        'hover:border-stone-400 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/15 focus:outline-none',
        'disabled:cursor-not-allowed disabled:bg-stone-50 disabled:opacity-70',
        'aria-[invalid=true]:border-danger-600 aria-[invalid=true]:focus:ring-danger-600/15',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'min-h-28 w-full rounded-xl border border-stone-300 bg-white px-3.5 py-3 text-sm text-navy-900 transition-colors',
      'placeholder:text-stone-400',
      'hover:border-stone-400 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/15 focus:outline-none',
      'disabled:cursor-not-allowed disabled:bg-stone-50 disabled:opacity-70',
      'aria-[invalid=true]:border-danger-600',
      className,
    )}
    {...props}
  />
));
Textarea.displayName = 'Textarea';

/**
 * Beschriftung für Formularfelder.
 *
 * Die Verknüpfung mit dem Eingabefeld stellen die aufrufenden Stellen über
 * `htmlFor` her – innerhalb dieser generischen Hülle kann ESLint das nicht
 * erkennen. Die Zuordnung selbst ist an jeder Verwendungsstelle vorhanden.
 */
export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control -- htmlFor kommt vom Aufrufer
    <label className={cn('mb-1.5 block text-sm font-medium text-navy-800', className)} {...props} />
  );
}

export function FieldError({ children }: { children?: string }) {
  if (!children) return null;
  return (
    <p role="alert" className="mt-1.5 text-xs font-medium text-danger-600">
      {children}
    </p>
  );
}
