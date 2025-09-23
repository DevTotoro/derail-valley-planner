import type { ReactNode, SVGProps } from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface Props {
  icon: (props: SVGProps<SVGSVGElement>) => ReactNode;
  label: string;
  infoPoints:
    | {
        label?: string;
        value: string;
      }[]
    | undefined;
}

export const QuickInfo = ({ icon: Icon, label, infoPoints }: Props) => {
  return (
    <div className="flex items-start gap-4">
      <Tooltip>
        <TooltipTrigger>
          <Icon className="inline size-5" />
        </TooltipTrigger>

        <TooltipContent>{label}</TooltipContent>
      </Tooltip>

      <div className="text-muted-foreground flex flex-col gap-1">
        {infoPoints ? (
          infoPoints.map(({ label, value }, index) => (
            <div key={index} className="flex gap-1">
              {label && <span className="inline-block min-w-[6ch]">{label}</span>}
              <span className="font-bold">{value}</span>
            </div>
          ))
        ) : (
          <span className="font-bold">-</span>
        )}
      </div>
    </div>
  );
};
