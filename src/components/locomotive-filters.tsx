import Link from 'next/link';

import { locomotiveTypes } from '@/lib/config';

import { Toggle } from '@/components/ui/toggle';

interface Props {
  filters: (keyof typeof locomotiveTypes)[];
}

export const LocomotiveFilters = ({ filters }: Props) => {
  const onFilterClick = (type: keyof typeof locomotiveTypes) => {
    if (filters.includes(type)) {
      return filters.filter(f => f !== type);
    }
    return [...filters, type];
  };

  return (
    <div className="hidden gap-2 md:flex">
      <Toggle asChild pressed={filters.length === 0}>
        <Link href="/locomotives">All</Link>
      </Toggle>

      {Object.entries(locomotiveTypes).map(([typeKey, typeName]) => (
        <Toggle key={typeKey} asChild pressed={filters.includes(typeKey as keyof typeof locomotiveTypes)}>
          <Link
            href={{
              pathname: '/locomotives',
              query: {
                type: onFilterClick(typeKey as keyof typeof locomotiveTypes)
              }
            }}
          >
            {typeName}
          </Link>
        </Toggle>
      ))}
    </div>
  );
};
