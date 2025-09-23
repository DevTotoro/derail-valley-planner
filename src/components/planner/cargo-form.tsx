import type { Cargo } from '@/lib/schemas/delivery.schema';
import { stationIds, stations } from '@/lib/config';

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
import { Input } from '@/components/ui/input';

interface Props {
  cargo: Cargo;
  setCargo: (cargo: Cargo) => void;
}

export const CargoForm = ({ cargo, setCargo }: Props) => {
  const handleJobIdChange = (jobId: string) => {
    setCargo({ ...cargo, jobId });
  };

  const handleDestinationChange = (destination: string) => {
    if (!stationIds.includes(destination as (typeof stationIds)[number])) return;

    setCargo({ ...cargo, destination: destination as (typeof stationIds)[number] });
  };

  const handleWeightChange = (weight: number) => {
    setCargo({ ...cargo, weight });
  };

  const handleLengthChange = (length: number) => {
    setCargo({ ...cargo, length });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Job ID */}
      <div className="flex flex-col gap-2">
        <Label htmlFor={`cargo-job-id-${cargo.id}`}>Job</Label>
        <Input
          id={`cargo-job-id-${cargo.id}`}
          placeholder="HB-FH-01"
          value={cargo.jobId}
          onChange={e => handleJobIdChange(e.target.value)}
        />
      </div>

      {/* Destination */}
      <div className="flex flex-col gap-2">
        <Label htmlFor={`cargo-destination-${cargo.id}`}>Destination</Label>
        <Select value={cargo.destination ?? ''} onValueChange={handleDestinationChange}>
          <SelectTrigger id={`cargo-destination-${cargo.id}`} className="w-full">
            <SelectValue placeholder="Select destination" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Destination</SelectLabel>
              {stationIds.map(stationId => (
                <SelectItem key={stationId} value={stationId}>
                  <div
                    className="size-2 shrink-0 rounded-full border-2"
                    style={{ backgroundColor: stations[stationId].hex }}
                  />
                  {`(${stationId}) ${stations[stationId].name}`}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Weight */}
      <div className="flex flex-col gap-2">
        <Label htmlFor={`cargo-weight-${cargo.id}`}>Weight (t)</Label>
        <Input
          id={`cargo-weight-${cargo.id}`}
          type="number"
          placeholder="12.5"
          min={0}
          step={0.01}
          value={cargo.weight ?? ''}
          onChange={e => handleWeightChange(Number(e.target.value))}
        />
      </div>

      {/* Length */}
      <div className="flex flex-col gap-2">
        <Label htmlFor={`cargo-length-${cargo.id}`}>Length (m)</Label>
        <Input
          id={`cargo-length-${cargo.id}`}
          type="number"
          placeholder="12.5"
          min={0}
          step={0.01}
          value={cargo.length ?? ''}
          onChange={e => handleLengthChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
};
