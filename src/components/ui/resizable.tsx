'use client';

import { GripVertical } from 'lucide-react';
import * as ResizablePrimitive from 'react-resizable-panels';

import { cn } from '@/lib/utils';

// react-resizable-panels v4 renamed the primitives:
//   PanelGroup -> Group, PanelResizeHandle -> Separator (Panel is unchanged)
// and replaced the `direction` prop with `orientation`.
const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Group>) => (
  <ResizablePrimitive.Group className={cn('flex h-full w-full', className)} {...props} />
);

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Separator> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.Separator
    className={cn(
      'group relative flex w-1.5 items-center justify-center bg-border transition-colors hover:bg-primary/40 data-[resize-handle-state=drag]:bg-primary/60 after:absolute after:inset-y-0 after:left-1/2 after:w-3 after:-translate-x-1/2 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1',
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-7 w-4 items-center justify-center rounded-md border bg-background text-muted-foreground shadow-sm transition-colors group-hover:border-primary/50 group-hover:text-primary">
        <GripVertical className="h-3.5 w-3.5" />
      </div>
    )}
  </ResizablePrimitive.Separator>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
