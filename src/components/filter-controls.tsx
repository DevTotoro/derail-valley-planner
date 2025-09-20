import Link from 'next/link';
import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

import { Toggle } from '@/components/ui/toggle';
import { Button } from '@/components/ui/button';

interface Props extends HTMLAttributes<HTMLDivElement> {
  path: string;
  queryKey: string;
  filterOptions: Record<string, string>;
  currentFilters: string[];
}

export const FilterControls = ({ path, queryKey, filterOptions, currentFilters, className, ...props }: Props) => {
  const onFilterClick = (type: string) => {
    if (currentFilters.includes(type)) {
      return currentFilters.filter(f => f !== type);
    }

    return [...currentFilters, type];
  };

  return (
    <div className={cn('items-center justify-between', className)} {...props}>
      <div className="flex gap-2">
        {Object.entries(filterOptions).map(([filterKey, filterName]) => (
          <Toggle key={filterKey} asChild size="sm" pressed={currentFilters.includes(filterKey)}>
            <Link
              href={{
                pathname: path,
                query: {
                  [queryKey]: onFilterClick(filterKey)
                }
              }}
            >
              {filterName}
            </Link>
          </Toggle>
        ))}
      </div>

      {currentFilters.length > 0 && (
        <Button asChild size="sm" variant="link">
          <Link href={path}>Clear</Link>
        </Button>
      )}
    </div>
  );
};
