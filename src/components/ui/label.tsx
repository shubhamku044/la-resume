import { LabelHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// Replace the empty interface with a type alias
type LabelProps = LabelHTMLAttributes<HTMLLabelElement>

export function Label({ className, ...props }: LabelProps) {
  return <label className={cn('block text-sm font-medium', className)} {...props} />
}
