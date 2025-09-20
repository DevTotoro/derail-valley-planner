import Link from 'next/link';
import type { ReactNode } from 'react';

import { locomotives, locomotiveTypes } from '@/lib/config';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Icons } from '@/components/icons';

interface Props {
  locomotiveId: keyof typeof locomotives;
}

export const LocomotiveCard = ({ locomotiveId }: Props) => {
  const locomotive = locomotives[locomotiveId];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link
            href={locomotive.url}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            {locomotive.name}
          </Link>
        </CardTitle>
        <CardDescription>{locomotiveTypes[locomotive.type]}</CardDescription>
      </CardHeader>

      <CardContent className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <InfoItem
          icon={Icons.dimensions}
          label="Dimensions in meters"
          info={[
            { label: 'L', value: `${locomotive.dimensions.length}m` },
            { label: 'W', value: `${locomotive.dimensions.width}m` },
            { label: 'H', value: `${locomotive.dimensions.height}m` }
          ]}
        />

        <InfoItem
          icon={Icons.weight}
          label="Weight in metric tons"
          info={
            locomotive.weight.wet
              ? [
                  { label: 'DRY', value: `${locomotive.weight.dry}t` },
                  { label: 'WET', value: `${locomotive.weight.wet}t` }
                ]
              : [{ value: `${locomotive.weight.dry}t` }]
          }
        />

        <InfoItem
          icon={Icons.loadRating}
          label="Load rating in metric tons"
          info={
            locomotive.loadRating
              ? [
                  { label: '0%', value: `${locomotive.loadRating.flat}t` },
                  { label: '2%', value: `${locomotive.loadRating.incline}t` },
                  { label: 'WET 2%', value: `${locomotive.loadRating.wetIncline}t` }
                ]
              : undefined
          }
        />
      </CardContent>
    </Card>
  );
};

const InfoItem = ({
  icon: Icon,
  label,
  info
}: {
  icon: (props: React.SVGProps<SVGSVGElement>) => ReactNode;
  label: string;
  info:
    | {
        label?: string;
        value: string;
      }[]
    | undefined;
}) => {
  return (
    <div className="flex items-start gap-4">
      <Tooltip>
        <TooltipTrigger>
          <Icon className="inline size-5" />
        </TooltipTrigger>

        <TooltipContent>{label}</TooltipContent>
      </Tooltip>

      <div className="text-muted-foreground flex flex-col gap-1">
        {info ? (
          info.map(({ label, value }, index) => (
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
