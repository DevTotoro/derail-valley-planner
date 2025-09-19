'use client';

import Link from 'next/link';
import { useState } from 'react';

import { siteConfig } from '@/lib/config';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="sm:hidden">
        <Button variant="ghost" size="icon" className="size-8">
          <Icons.menu className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="text-muted-foreground flex flex-col gap-4 px-6 py-12 text-2xl font-medium">
        <SheetHeader className="sr-only">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Navigation links</SheetDescription>
        </SheetHeader>

        <Link href="/" onClick={() => setOpen(false)}>
          Home
        </Link>
        {siteConfig.navItems.map(item => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
      </SheetContent>
    </Sheet>
  );
};
