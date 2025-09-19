import Link from 'next/link';

import { siteConfig } from '@/lib/config';

export const Footer = () => {
  return (
    <footer className="text-muted-foreground bg-background w-full text-xs sm:text-sm">
      <div className="container-wrapper flex h-16 items-center justify-center">
        <div className="text-center">
          Built by{' '}
          <Link
            href={siteConfig.authors.devTotoro.url}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            DevTotoro
          </Link>
          . Source code available on{' '}
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </Link>
          .
        </div>
      </div>
    </footer>
  );
};
