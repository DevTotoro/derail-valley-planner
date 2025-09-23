import Link from 'next/link';

import { locomotives, locomotiveTypes } from '@/lib/config';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { QuickInfo } from '@/components/quick-info';

interface Props {
  locomotiveId: keyof typeof locomotives;
}

export const LocomotiveCard = ({ locomotiveId }: Props) => {
  const { name, url, type, dimensions, weight, loadRating } = locomotives[locomotiveId];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href={url} target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
            {name}
          </Link>
        </CardTitle>
        <CardDescription>{locomotiveTypes[type]}</CardDescription>
      </CardHeader>

      <CardContent className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <QuickInfo
          icon={Icons.dimensions}
          label="Dimensions in meters"
          infoPoints={[
            { label: 'L', value: `${dimensions.length}m` },
            { label: 'W', value: `${dimensions.width}m` },
            { label: 'H', value: `${dimensions.height}m` }
          ]}
        />

        <QuickInfo
          icon={Icons.weight}
          label="Weight in metric tons"
          infoPoints={
            weight.wet
              ? [
                  { label: 'DRY', value: `${weight.dry}t` },
                  { label: 'WET', value: `${weight.wet}t` }
                ]
              : [{ value: `${weight.dry}t` }]
          }
        />

        <QuickInfo
          icon={Icons.loadRating}
          label="Load rating in metric tons"
          infoPoints={
            loadRating
              ? [
                  { label: '0%', value: `${loadRating.flat}t` },
                  { label: '2%', value: `${loadRating.incline}t` },
                  { label: 'WET 2%', value: `${loadRating.wetIncline}t` }
                ]
              : undefined
          }
        />
      </CardContent>
    </Card>
  );
};
