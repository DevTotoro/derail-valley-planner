'use client';

import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export const ThemeModeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-8"
      title="Toggle theme"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Icons.theme className="size-4" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
