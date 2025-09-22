import Link from 'next/link';

import type { Delivery } from '@/lib/schemas/delivery.schema';
import { getDeliveryStats } from '@/lib/deliveries';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Icons } from '@/components/icons';
import { QuickInfo } from '@/components/quick-info';

interface Props {
  delivery: Delivery;
  onDelete: (id: string) => void;
}

export const DeliveryCard = ({ delivery, onDelete }: Props) => {
  const { id, name, rollingStock } = delivery;

  const { loadRating, weight, length } = getDeliveryStats(delivery);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <Link href={`/planner?id=${id}`} className="font-medium underline underline-offset-4">
            {name || `Delivery #${id}`}
          </Link>

          <Button size="icon" variant="destructive" className="size-8" onClick={() => onDelete(id)}>
            <Icons.trash />
          </Button>
        </CardTitle>
        <CardDescription className="flex gap-4">
          <span>Locomotives: {rollingStock.filter(rs => rs.type === 'locomotive').length}</span>
          <span>Cargo: {rollingStock.filter(rs => rs.type === 'cargo').length}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex justify-between">
        <QuickInfo
          icon={Icons.loadRating}
          label="Load rating in metric tons"
          infoPoints={[{ value: `${loadRating}t` }]}
        />

        <QuickInfo icon={Icons.weight} label="Weight in metric tons" infoPoints={[{ value: `${weight}t` }]} />

        <QuickInfo icon={Icons.dimensions} label="Length in meters" infoPoints={[{ value: `${length}m` }]} />
      </CardContent>
    </Card>
  );
};
