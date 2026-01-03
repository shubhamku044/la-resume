'use client';

import { FileText, Users } from 'lucide-react';
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
  return (
    <div className="bg-gray-100 px-4 py-3 text-gray-700 dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-8 text-center sm:gap-12">
        <div className="flex items-center gap-2">
          <LuGithub className="size-5" />
          <span>
            <span className="font-bold">
              <CountUp start={0} end={stars} delay={1} duration={2} separator="," />
            </span>{' '}
            GitHub Stars
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="size-5" />
          <span>
            <span className="font-bold">
              <CountUp start={0} end={signups} delay={3} duration={2} separator="," />
            </span>{' '}
            Happy Users
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="size-5" />
          <span>
            <span className="font-bold">
              <CountUp start={0} end={resumes} delay={5} duration={2} separator="," />
            </span>{' '}
            Resumes Created
          </span>
        </div>
      </div>
    </div>
  );
};
