'use client';

import { FileText, Users } from 'lucide-react';
import type { ComponentType } from 'react';
import CountUp from 'react-countup';
import { LuGithub } from 'react-icons/lu';

interface StatsBannerInteractiveProps {
  stars: number;
  signups: number;
  resumes: number;
}

export const StatsBannerInteractive = ({
  stars,
  signups,
  resumes,
}: StatsBannerInteractiveProps) => {
  const stats: { icon: ComponentType<{ className?: string }>; value: number; label: string }[] = [
    { icon: LuGithub, value: stars, label: 'GitHub Stars' },
    { icon: Users, value: signups, label: 'Happy Users' },
    { icon: FileText, value: resumes, label: 'Resumes Created' },
  ].filter((stat) => stat.value > 0);

  if (stats.length === 0) {
    return null;
  }

  return (
    <div className="border-b border-border/60 bg-secondary/60 px-4 py-2.5 text-sm text-muted-foreground">
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center sm:gap-x-12">
        {stats.map(({ icon: Icon, value, label }, index) => (
          <div key={label} className="flex items-center gap-2">
            <Icon className="size-4 text-primary" />
            <span>
              <span className="font-semibold text-foreground">
                <CountUp start={0} end={value} delay={index * 0.4} duration={2} separator="," />
              </span>{' '}
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
