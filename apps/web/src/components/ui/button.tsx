import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-accent-600 text-white shadow-soft hover:bg-accent-500 hover:shadow-card active:scale-[0.98]',
        secondary: 'bg-navy-900 text-white shadow-soft hover:bg-navy-800 active:scale-[0.98]',
        outline:
          'border border-stone-300 bg-white text-navy-900 hover:border-navy-300 hover:bg-stone-50 active:scale-[0.98]',
        ghost: 'text-navy-800 hover:bg-stone-100 active:scale-[0.98]',
        link: 'text-accent-700 underline-offset-4 hover:underline',
        danger: 'bg-danger-600 text-white hover:bg-danger-700 active:scale-[0.98]',
      },
      size: {
        sm: 'h-9 rounded-lg px-3.5 text-sm [&_svg]:size-4',
        md: 'h-11 rounded-xl px-5 text-sm [&_svg]:size-4',
        lg: 'h-13 rounded-xl px-7 text-base [&_svg]:size-5',
        icon: 'size-11 rounded-xl [&_svg]:size-5',
        'icon-sm': 'size-9 rounded-lg [&_svg]:size-4',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...(!asChild && { type: type ?? 'button' })}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { buttonVariants };
