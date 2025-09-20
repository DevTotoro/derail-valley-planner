import { stations, stationUtilities } from '@/lib/config';

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Icons } from '@/components/icons';

interface Props {
  stationId: keyof typeof stations;
}

export const StationCard = ({ stationId }: Props) => {
  const { name, hex, utilities } = stations[stationId];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{stationId}</CardDescription>
        <CardAction>
          <div className="size-5 rounded-full border-2" style={{ backgroundColor: hex }} />
        </CardAction>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-2">
        {Object.entries(stationUtilities).map(([key, label]) => {
          const Icon = getUtilityIcon(key as keyof typeof stationUtilities);

          return (
            <div key={key} className="flex items-center gap-4">
              <Tooltip>
                <TooltipTrigger>
                  <Icon className="inline size-5" />
                </TooltipTrigger>

                <TooltipContent>{label}</TooltipContent>
              </Tooltip>

              {utilities.includes(key as keyof typeof stationUtilities) ? (
                <span>
                  <Icons.success className="inline size-5 text-green-500" />
                  <span className="sr-only">Available</span>
                </span>
              ) : (
                <span>
                  <Icons.error className="inline size-5 text-red-500" />
                  <span className="sr-only">Unavailable</span>
                </span>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

const getUtilityIcon = (utility: keyof typeof stationUtilities) => {
  switch (utility) {
    case 'rs':
      return Icons.repairStation;
    case 'ds':
      return Icons.dieselService;
    case 'cs':
      return Icons.coalService;
    case 'ec':
      return Icons.electricCharger;
    case 's':
      return Icons.shop;
  }
};
