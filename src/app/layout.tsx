import '@/styles/globals.css';

import type { Metadata } from 'next';

import { siteConfig } from '@/lib/config';
import { fontVariables } from '@/lib/fonts';
import { cn } from '@/lib/utils';

import { ThemeProvider } from '@/components/theme/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

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
      <body
        className={cn(
          'bg-background text-foreground relative flex min-h-svh flex-col font-sans antialiased',
          fontVariables
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
