'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { deedyResumeData, resumesMap, Sb2novResumeData } from '@/lib/templates/index';

interface ResumeCardProps {
  id: string;
  title: string;
  slug: string;
  type: keyof typeof resumesMap;
  onDelete: () => void;
  isDeleting: boolean;
  lastUpdated: Date;
  data: Sb2novResumeData | deedyResumeData;
  imageUrl: string;
}

export function ResumeCard({
  title,
  slug,
  type,
  onDelete,
  isDeleting,
  lastUpdated,
  imageUrl: imageLink, // Use the imageLink prop directly
}: ResumeCardProps) {
  console.log('Image Link:', imageLink);
  return (
    <Card className="group relative flex h-full flex-col overflow-hidden shadow-lg transition-all hover:shadow-xl">
      <div className="relative aspect-[1/1.414] h-full">
        {imageLink ? (
          <Image
            src={imageLink}
            alt={`Preview of ${title}`}
            fill
            className="aspect-[1/1.414] object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted">
            <span className="text-muted-foreground">No preview available</span>
          </div>
        )}
      </div>

      <div className="absolute inset-0 flex translate-y-full flex-col justify-end bg-gradient-to-t from-black/50 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="flex flex-col gap-2 text-white backdrop-blur-sm">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-white/80">{type} Template</p>
            <p className="mt-1 text-xs text-white/60">
              Last updated: {new Date(lastUpdated).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 bg-white/10 hover:bg-white/20"
                asChild
              >
                <Link href={imageLink} target="_blank">
                  Preview
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="bg-white/10 hover:bg-white/20" asChild>
                <Link href={`/resume/template/${type}/${slug}`}>Edit</Link>
              </Button>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={onDelete}
              disabled={isDeleting}
              className="disabled:cursor-wait"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
