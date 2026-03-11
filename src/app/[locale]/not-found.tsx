import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4">
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-warm-muted">
          <Search className="h-10 w-10 text-muted-foreground/30" />
        </div>
        <h1 className="mt-6 font-serif text-2xl font-bold tracking-tight text-navy">
          Page Not Found
        </h1>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="mt-8 inline-block">
          <Button className="rounded-xl bg-gold px-6 py-5 text-sm font-semibold text-white shadow-md shadow-gold/20 hover:bg-gold/90">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
