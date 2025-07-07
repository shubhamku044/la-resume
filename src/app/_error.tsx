'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, Home, RefreshCw, AlertTriangle } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative">
          <div className="mx-auto w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-12 h-12 text-destructive" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-destructive rounded-full animate-pulse" />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Oops! Something went wrong</h1>
          <p className="text-muted-foreground leading-relaxed">
            We encountered an unexpected error while processing your request. Don&apos;t worry, our
            team has been notified and we&apos;re working to fix it.
          </p>

          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                View error details
              </summary>
              <div className="mt-2 p-3 bg-muted rounded-md text-xs font-mono text-destructive overflow-auto max-h-32">
                {error.message}
              </div>
            </details>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} className="flex items-center gap-2" size="lg">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>

          <Button variant="outline" asChild size="lg">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>
        </div>

        <div className="pt-8 border-t border-border/50">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <FileText className="w-5 h-5 text-primary" />
            <span className="font-semibold">La Resume</span>
          </Link>
        </div>

        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-destructive/5 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}
