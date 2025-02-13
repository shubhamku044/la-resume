import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'px-4 py-2 rounded-md font-semibold transition',
          variant === 'outline'
            ? 'border border-gray-300 bg-white text-black hover:bg-gray-100'
            : 'bg-blue-600 text-white hover:bg-blue-700',
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button }
