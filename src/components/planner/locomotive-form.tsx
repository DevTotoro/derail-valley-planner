import { useMemo } from 'react';
import type { CheckedState } from '@radix-ui/react-checkbox';

import type { Locomotive } from '@/lib/schemas/delivery.schema';
import { locomotives } from '@/lib/config';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import type { DirtyRollingStock } from '@/components/planner/rolling-stock-card';

export type DirtyLocomotive = Pick<Locomotive, 'id' | 'type'> & Partial<Omit<Locomotive, 'id' | 'type'>>;

interface Props {
  locomotive: DirtyLocomotive;
  setLocomotive: (locomotive: DirtyLocomotive) => void;
  previousRollingStock?: DirtyRollingStock;
  nextRollingStock?: DirtyRollingStock;
}

export const LocomotiveForm = ({ locomotive, setLocomotive, previousRollingStock, nextRollingStock }: Props) => {
  const options = Object.entries(locomotives).map(([key, value]) => ({ value: key, label: value.name }));

  const isActive = useMemo(() => {
    if (locomotive.model === 'caboose') return false;

    if (locomotive.model === 'de6-860s') {
      if (previousRollingStock?.type === 'locomotive') {
        const previousLocomotive = previousRollingStock as DirtyLocomotive;
        if (previousLocomotive.model === 'de6-860' && previousLocomotive.active) return true;
      }
      if (nextRollingStock?.type === 'locomotive') {
        const nextLocomotive = nextRollingStock as DirtyLocomotive;
        if (nextLocomotive.model === 'de6-860' && nextLocomotive.active) return true;
      }

      return false;
    }

    return locomotive.active ?? false;
  }, [locomotive, previousRollingStock, nextRollingStock]);

  const isActiveDisabled = locomotive.model === 'caboose' || locomotive.model === 'de6-860s';

  const handleModelChange = (model: string) => {
    if (!options.some(option => option.value === model)) return;

    setLocomotive({ ...locomotive, model });
  };

  const handleActiveChange = (active: CheckedState) => {
    setLocomotive({ ...locomotive, active: active === 'indeterminate' ? false : active });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor={`locomotive-model-${locomotive.id}`}>Model</Label>
        <Select value={locomotive.model} onValueChange={handleModelChange}>
          <SelectTrigger id={`locomotive-model-${locomotive.id}`} className="w-full">
            <SelectValue placeholder="Select model" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Model</SelectLabel>
              {options.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-3">
        <Checkbox
          id={`locomotive-active-${locomotive.id}`}
          checked={isActive}
          onCheckedChange={handleActiveChange}
          disabled={isActiveDisabled}
        />
        <Label htmlFor={`locomotive-active-${locomotive.id}`}>Active</Label>
      </div>
    </div>
  );
};
