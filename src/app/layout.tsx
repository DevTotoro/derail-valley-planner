import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Derail Valley Planner',
  description: 'Plan your trips in Derail Valley'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
