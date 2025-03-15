'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  deedyResumeData,
  resumesMap,
  Sb2novResumeData,
  MTeckResumeData,
} from '@/lib/templates/index';
import { RotateCw, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ResumeCardProps {
  id: string;
  title: string;
  slug: string;
  type: keyof typeof resumesMap;
  onDelete: () => void;
  isDeleting: boolean;
  lastUpdated: Date;
  data: Sb2novResumeData | deedyResumeData | MTeckResumeData;
  imageUrl: string;
}

export function ResumeCard({
  title,
  slug,
  type,
  onDelete,
  isDeleting,
  lastUpdated,
  imageUrl: imageLink,
}: ResumeCardProps) {
  const t = useTranslations();
  return (
    <Card className="group relative flex h-full -translate-y-1 flex-col overflow-hidden shadow-lg transition-all">
      <div className="relative size-full bg-white" style={{ aspectRatio: '1 / 1.414' }}>
        {imageLink ? (
          <Image
            src={imageLink}
            alt={`Preview of ${title}`}
            fill
            className="scale-105 object-contain p-4 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            unoptimized
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center bg-muted p-4">
            <div className="flex size-full items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30">
              <span className="text-center text-sm text-muted-foreground">
                Preview not available
              </span>
            </div>
          </div>
        )}

        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex flex-col gap-3 text-white">
            <div className="space-y-1.5">
              <h3 className="text-lg font-semibold drop-shadow-md">{title}</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/80">
                  Updated {formatDistanceToNow(lastUpdated, { addSuffix: true })}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20"
                  asChild
                >
                  <Link href={imageLink ?? '#'} target="_blank">
                    Preview PDF
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20"
                  asChild
                >
                  <Link href={`/resume/template/${type}/${slug}`}>Edit Resume</Link>
                </Button>
              </div>

              <Button
                variant="destructive"
                size="sm"
                onClick={onDelete}
                disabled={isDeleting}
                className="gap-1.5 backdrop-blur-sm"
              >
                {isDeleting ? (
                  <>
                    <RotateCw className="size-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="size-4" />
                    {t('common.delete')}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
