import { MainNav } from '@/components/layout/main-nav';
import { MobileNav } from '@/components/layout/mobile-nav';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container mx-auto flex h-16 items-center px-4 lg:px-8">
        <MainNav />
        <MobileNav />
      </div>
    </header>
  );
};
