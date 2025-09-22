import { useMemo } from 'react';
import type { CheckedState } from '@radix-ui/react-checkbox';

import type { Locomotive, RollingStock } from '@/lib/schemas/delivery.schema';
import { locomotiveModels, locomotives } from '@/lib/config';

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

interface Props {
  locomotive: Locomotive;
  setLocomotive: (locomotive: Locomotive) => void;
  previousRollingStock?: RollingStock;
  nextRollingStock?: RollingStock;
}

export const LocomotiveForm = ({ locomotive, setLocomotive, previousRollingStock, nextRollingStock }: Props) => {
  const options = locomotiveModels.map(model => ({ value: model, label: locomotives[model].name }));

  const isActive = useMemo(() => {
    if (locomotive.model === 'caboose') return false;

    if (locomotive.model === 'de6-860s') {
      return (
        (previousRollingStock?.type === 'locomotive' &&
          previousRollingStock.model === 'de6-860' &&
          previousRollingStock.active) ||
        (nextRollingStock?.type === 'locomotive' && nextRollingStock.model === 'de6-860' && nextRollingStock.active)
      );
    }

    return locomotive.active ?? false;
  }, [locomotive, previousRollingStock, nextRollingStock]);

  const isActiveDisabled = locomotive.model === 'caboose' || locomotive.model === 'de6-860s';

  const handleModelChange = (model: string) => {
    if (!locomotiveModels.includes(model as (typeof locomotiveModels)[number])) return;

    setLocomotive({ ...locomotive, model: model as (typeof locomotiveModels)[number] });
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
