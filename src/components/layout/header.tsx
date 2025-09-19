import Link from 'next/link';

import { siteConfig } from '@/lib/config';

import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

import { MainNav } from '@/components/layout/main-nav';
import { MobileNav } from '@/components/layout/mobile-nav';
import { ThemeModeToggle } from '@/components/theme/theme-mode-toggle';
import { Icons } from '@/components/icons';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container-wrapper flex h-16 items-center">
        <MainNav />
        <MobileNav />

        <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
          <Button asChild size="sm" variant="ghost" className="h-8 shadow-none">
            <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
              <Icons.gitHub className="size-4" />
            </Link>
          </Button>

          <Separator orientation="vertical" className="!h-4" />

          <ThemeModeToggle />
        </div>
      </div>
    </header>
  );
};
