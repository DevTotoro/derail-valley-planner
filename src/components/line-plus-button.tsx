import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export const LinePlusButton = ({ className, ...props }: ComponentProps<'button'>) => {
  return (
    <div className="relative h-full">
      <div className="inset-y-0 h-full w-px shrink-0 border-l border-dashed" />
      <Button
        size="icon"
        variant="secondary"
        className={cn('absolute top-1/2 left-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full', className)}
        {...props}
      >
        <Icons.plus />
      </Button>
    </div>
  );
};
