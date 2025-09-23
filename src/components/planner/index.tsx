'use client';

import { PlannerContextProvider } from '@/components/planner/planner-context';
import { PlannerComponent } from '@/components/planner/planner-component';

interface Props {
  id: string | undefined;
}

export const Planner = ({ id }: Props) => {
  return (
    <PlannerContextProvider id={id}>
      <PlannerComponent />
    </PlannerContextProvider>
  );
};
