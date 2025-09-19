import { Separator } from '@/components/ui/separator';

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex items-center justify-center gap-4 font-light">
        <h1 className="text-2xl">404</h1>
        <Separator orientation="vertical" className="!h-8" />
        <h2 className="font-extralight">Page not found</h2>
      </div>
    </div>
  );
}
