import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Eye, Star } from 'lucide-react';
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
    <>
      <Card className="group cursor-pointer animate-fade-in hover:scale-105 transition-all duration-300">
        <CardContent className="p-0">
          <div className="aspect-[8.5/11] bg-gradient-secondary rounded-t-lg relative overflow-hidden">
            {imageUrl ? (
              <Image
                src={getAssetUrl(imageUrl)}
                alt={title}
                width={210}
                height={297}
                className="w-full h-full object-cover"
                priority
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-3/4 h-5/6 bg-card rounded shadow-card p-4">
                  <div className="space-y-3">
                    <div className="h-3 bg-gradient-primary rounded opacity-20"></div>
                    <div className="h-2 bg-muted rounded w-3/4"></div>
                    <div className="h-2 bg-muted rounded w-1/2"></div>
                    <div className="space-y-1 mt-6">
                      <div className="h-1.5 bg-muted rounded"></div>
                      <div className="h-1.5 bg-muted rounded w-4/5"></div>
                      <div className="h-1.5 bg-muted rounded w-3/5"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isPremium && (
              <Badge className="absolute top-3 right-3 bg-warning text-warning-foreground">
                <Star className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            )}

            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="space-x-2">
                <Button size="sm" variant="secondary" onClick={onUse}>
                  <Eye className="w-4 h-4 mr-1" />
                  Use Template
                </Button>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4">
          <div className="w-full">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg">{title}</h3>
              {rating > 0 && (
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <span className="text-sm text-muted-foreground">{rating}</span>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
