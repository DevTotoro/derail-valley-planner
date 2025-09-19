import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <section className="border-grid">
      <div className="container-wrapper">
        <div className="container flex flex-col items-center gap-2 py-8 text-center md:py-16 lg:py-20 xl:gap-4">
          <h1 className="text-primary leading-tighter max-w-4xl text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter">
            A companion for your next delivery
          </h1>

          <p className="text-foreground max-w-3xl text-base text-balance sm:text-lg">
            Derail Valley Planner is an open-source tool for planning and optimizing railway deliveries in{' '}
            <Link
              href="https://derailvalley.com/"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Derail Valley
            </Link>
            .
          </p>

          <div className="flex w-full items-center justify-center gap-2 pt-2">
            <Button asChild size="sm">
              <Link href="/deliveries">Get Started</Link>
            </Button>
            <Button asChild size="sm" variant="ghost">
              <Link href="/locomotives">View Locomotives</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
