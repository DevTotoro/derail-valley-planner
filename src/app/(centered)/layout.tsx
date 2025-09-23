import type { ReactNode } from 'react';

export default function CenteredLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <div className="container-wrapper flex flex-1 flex-col">{children}</div>;
}
