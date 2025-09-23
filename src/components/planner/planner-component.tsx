import { Fragment, type ReactNode, type SVGProps, useContext } from 'react';

import { cn, nanoid } from '@/lib/utils';
import type { RollingStock } from '@/lib/schemas/delivery.schema';
import { getDeliveryStats } from '@/lib/deliveries';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { PlannerContext } from '@/components/planner/planner-context';
import { RollingStockCard } from '@/components/planner/rolling-stock-card';
import { Icons } from '@/components/icons';

export const PlannerComponent = () => {
  const { delivery, updateDelivery } = useContext(PlannerContext);

  const { loadRating, weight, length } = getDeliveryStats(delivery);

  const addRollingStock = (index: number) => {
    const newRollingStock = [...delivery.rollingStock];
    newRollingStock.splice(index, 0, { id: nanoid(), type: index === 0 ? 'locomotive' : 'cargo' });

    updateDelivery({ ...delivery, rollingStock: newRollingStock });
  };

  const updateRollingStock = (rs: RollingStock) => {
    const newRollingStock = delivery.rollingStock.map(r => (r.id === rs.id ? rs : r));

    updateDelivery({ ...delivery, rollingStock: newRollingStock });
  };

  const removeRollingStock = (id: string) => {
    const newRollingStock = delivery.rollingStock.filter(r => r.id !== id);

    updateDelivery({ ...delivery, rollingStock: newRollingStock });
  };

  return (
    <div className="container-wrapper flex flex-1 flex-col gap-16 md:gap-32">
      <div className="flex items-center justify-center gap-4 pt-16 sm:gap-16 md:pt-32">
        <InfoOverview
          icon={Icons.loadRating}
          label="Total load rating in metric tons on a 2.0% grade"
          value={`${loadRating}t`}
        />
        <InfoOverview
          icon={Icons.weight}
          label="Total weight in metric tons"
          value={`${weight}t`}
          textClassName={
            loadRating > 0 && weight > 0 ? (weight > loadRating ? 'text-destructive' : undefined) : undefined
          }
        />
        <InfoOverview icon={Icons.dimensions} label="Total length in meters" value={`${length}m`} />
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-4 py-8 md:min-h-64 md:flex-row md:py-0">
        <Button
          size="icon"
          variant="secondary"
          aria-label="Add rolling stock"
          className="size-8 rounded-full"
          onClick={() => addRollingStock(0)}
        >
          <Icons.plus />
        </Button>

        {delivery.rollingStock.map((rs, i) => (
          <Fragment key={rs.id}>
            <RollingStockCard
              rollingStock={rs}
              setRollingStock={updateRollingStock}
              onDelete={() => removeRollingStock(rs.id)}
              previousRollingStock={i > 0 ? delivery.rollingStock[i - 1] : undefined}
              nextRollingStock={i < delivery.rollingStock.length - 1 ? delivery.rollingStock[i + 1] : undefined}
            />

            <Button
              size="icon"
              variant="secondary"
              aria-label="Add rolling stock"
              className="size-8 rounded-full"
              onClick={() => addRollingStock(i + 1)}
            >
              <Icons.plus />
            </Button>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

const InfoOverview = ({
  icon: Icon,
  label,
  value,
  textClassName
}: {
  icon: (props: SVGProps<SVGSVGElement>) => ReactNode;
  label: string;
  value: string;
  textClassName?: string;
}) => {
  return (
    <div className="flex items-end gap-2">
      <Tooltip>
        <TooltipTrigger>
          <Icon className="inline size-8" />
        </TooltipTrigger>

        <TooltipContent>{label}</TooltipContent>
      </Tooltip>

      <span className={cn('text-muted-foreground text-lg font-bold', textClassName)}>{value}</span>
    </div>
  );
};
