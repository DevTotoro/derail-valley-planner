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
import { Separator } from '@/components/ui/separator';

import { QuickInfo } from '@/components/quick-info';
import { Icons } from '@/components/icons';

interface Props {
  locomotive: Locomotive;
  setLocomotive: (locomotive: Locomotive) => void;
  previousRollingStock?: RollingStock;
  nextRollingStock?: RollingStock;
}

export const LocomotiveForm = ({ locomotive, setLocomotive, previousRollingStock, nextRollingStock }: Props) => {
  const locomotiveInfo = locomotive.model && locomotives[locomotive.model];

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

    setLocomotive({
      ...locomotive,
      model: model as (typeof locomotiveModels)[number],
      active: model !== 'de6-860s' && model !== 'caboose'
    });
  };

  const handleActiveChange = (active: CheckedState) => {
    setLocomotive({ ...locomotive, active: active === 'indeterminate' ? false : active });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Model */}
      <div className="flex flex-col gap-2">
        <Label htmlFor={`locomotive-model-${locomotive.id}`}>Model</Label>
        <Select value={locomotive.model ?? ''} onValueChange={handleModelChange}>
          <SelectTrigger id={`locomotive-model-${locomotive.id}`} className="w-full">
            <SelectValue placeholder="Select model" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Model</SelectLabel>
              {locomotiveModels.map(model => (
                <SelectItem key={model} value={model}>
                  {locomotives[model].name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Active */}
      <div className="flex items-center gap-3">
        <Checkbox
          id={`locomotive-active-${locomotive.id}`}
          checked={isActive}
          onCheckedChange={handleActiveChange}
          disabled={isActiveDisabled}
        />
        <Label htmlFor={`locomotive-active-${locomotive.id}`}>Active</Label>
      </div>

      {locomotiveInfo && (
        <>
          <Separator />

          <div className="flex flex-col gap-2">
            <QuickInfo
              icon={Icons.dimensions}
              label="Length in meters"
              infoPoints={[{ value: `${locomotiveInfo.dimensions.length}m` }]}
            />

            <QuickInfo
              icon={Icons.weight}
              label="Weight in metric tons"
              infoPoints={
                locomotiveInfo.weight.wet
                  ? [{ value: `${locomotiveInfo.weight.wet}t` }]
                  : [{ value: `${locomotiveInfo.weight.dry}t` }]
              }
            />

            <QuickInfo
              icon={Icons.loadRating}
              label="Load rating in metric tons on a 2.0% grade"
              infoPoints={locomotiveInfo.loadRating ? [{ value: `${locomotiveInfo.loadRating.incline}t` }] : undefined}
            />
          </div>
        </>
      )}
    </div>
  );
};
