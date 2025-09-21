import { Fragment, useContext, useState } from 'react';

import { nanoid } from '@/lib/utils';

import { PlannerContext } from '@/components/planner/planner-context';
import { type DirtyRollingStock, RollingStockCard } from '@/components/planner/rolling-stock-card';
import { LinePlusButton } from '@/components/line-plus-button';

export const PlannerComponent = () => {
  const { delivery } = useContext(PlannerContext);

  const [dirtyRollingStock, setDirtyRollingStock] = useState<DirtyRollingStock[]>(delivery.rollingStock);

  const addRollingStock = (index: number) => {
    setDirtyRollingStock(prev => {
      const newRollingStock = [...prev];
      newRollingStock.splice(index, 0, { id: nanoid(), type: index === 0 ? 'locomotive' : 'cargo' });
      return newRollingStock;
    });
  };

  const updateRollingStock = (index: number, rs: DirtyRollingStock) => {
    setDirtyRollingStock(prev => {
      const newRollingStock = [...prev];
      newRollingStock[index] = rs;
      return newRollingStock;
    });
  };

  return (
    <div className="flex flex-col gap-8 py-8 md:h-64 md:flex-row md:py-0">
      <LinePlusButton aria-label="Add rolling stock" onClick={() => addRollingStock(0)} />

      {dirtyRollingStock.map((rs, i) => (
        <Fragment key={rs.id}>
          <RollingStockCard
            rollingStock={rs}
            setRollingStock={updatedRs => updateRollingStock(i, updatedRs)}
            previousRollingStock={i > 0 ? dirtyRollingStock[i - 1] : undefined}
            nextRollingStock={i < dirtyRollingStock.length - 1 ? dirtyRollingStock[i + 1] : undefined}
          />
          <LinePlusButton aria-label="Add rolling stock" onClick={() => addRollingStock(i + 1)} />
        </Fragment>
      ))}
    </div>
  );
};
