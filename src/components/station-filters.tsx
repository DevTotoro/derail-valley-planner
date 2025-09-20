import Link from 'next/link';

import { stationUtilities } from '@/lib/config';

import { Toggle } from '@/components/ui/toggle';

interface Props {
  filters: (keyof typeof stationUtilities)[];
}

export const StationFilters = ({ filters }: Props) => {
  const onFilterClick = (type: keyof typeof stationUtilities) => {
    if (filters.includes(type)) {
      return filters.filter(f => f !== type);
    }
    return [...filters, type];
  };

  return (
    <div className="hidden gap-2 sm:flex">
      {Object.entries(stationUtilities).map(([utilityKey, utilityName]) => (
        <Toggle
          key={utilityKey}
          asChild
          size="sm"
          pressed={filters.includes(utilityKey as keyof typeof stationUtilities)}
        >
          <Link
            href={{
              pathname: '/stations',
              query: {
                utility: onFilterClick(utilityKey as keyof typeof stationUtilities)
              }
            }}
          >
            {utilityName}
          </Link>
        </Toggle>
      ))}
    </div>
  );
};
