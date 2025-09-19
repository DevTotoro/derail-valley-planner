import type { Metadata } from 'next';

import { siteConfig } from '@/lib/config';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: Object.values(siteConfig.authors).map(author => ({
    name: author.name,
    url: author.url
  })),
  creator: siteConfig.authors.devTotoro.name
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground relative flex min-h-svh flex-col">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
