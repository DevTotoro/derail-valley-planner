import Link from 'next/link';

import { siteConfig } from '@/lib/config';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export const MainNav = () => {
  return (
    <div className="hidden items-center gap-2 sm:flex">
      <Button asChild variant="ghost" size="icon" className="size-8">
        <Link href="/">
          <Icons.logo className="size-5" />
          <span className="sr-only">{siteConfig.name}</span>
        </Link>
      </Button>

      <NavigationMenu>
        <NavigationMenuList>
          {siteConfig.navItems.map(item => (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink className="font-medium" asChild>
                <Link href={item.href}>{item.label}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
