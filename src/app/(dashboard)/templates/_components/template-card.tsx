import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import Image from 'next/image';
import { getAssetUrl } from '@/lib/assets';

interface TemplateCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  isPremium?: boolean;
  rating?: number;
  onUse: () => void;
}

export function TemplateCard({
  title,
  description,
  imageUrl,
  isPremium = false,
  rating = 0,
  onUse,
}: TemplateCardProps) {
  return (
    <Card
      onClick={onUse}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant"
    >
      <CardContent className="p-0">
        <div className="relative aspect-8.5/11 overflow-hidden bg-secondary">
          {imageUrl ? (
            <Image
              src={getAssetUrl(imageUrl)}
              alt={title}
              width={420}
              height={544}
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              priority
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <div className="h-5/6 w-3/4 rounded bg-card p-4 shadow-card">
                <div className="space-y-3">
                  <div className="h-3 rounded bg-gradient-primary opacity-30"></div>
                  <div className="h-2 w-3/4 rounded bg-muted"></div>
                  <div className="h-2 w-1/2 rounded bg-muted"></div>
                  <div className="mt-6 space-y-1">
                    <div className="h-1.5 rounded bg-muted"></div>
                    <div className="h-1.5 w-4/5 rounded bg-muted"></div>
                    <div className="h-1.5 w-3/5 rounded bg-muted"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isPremium && (
            <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-warning px-2.5 py-1 text-xs font-semibold text-warning-foreground shadow-sm">
              <Sparkles className="h-3 w-3" />
              Premium
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-end justify-center bg-linear-to-t from-black/60 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Button
              size="sm"
              className="w-full gap-1.5 shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                onUse();
              }}
            >
              Use this template
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex-1 items-start p-4">
        <div className="w-full">
          <div className="mb-1 flex items-center justify-between gap-2">
            <h3 className="text-base font-semibold tracking-tight">{title}</h3>
            {rating > 0 && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="text-sm text-muted-foreground">{rating}</span>
              </div>
            )}
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
