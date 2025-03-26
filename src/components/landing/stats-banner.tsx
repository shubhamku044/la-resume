'use client';
import CountUp from 'react-countup';
import React from 'react';
import { FileText, Users } from 'lucide-react';
import { LuGithub } from 'react-icons/lu';
import { useGitHubStars } from '@/hooks';
import { useGetStatsQuery } from '@/store/services/statsApi';

export const StatsBanner = () => {
  const stars = useGitHubStars();
  const { data } = useGetStatsQuery();

  return (
    <div className="bg-gray-900 px-4 py-3 text-white dark:bg-gray-800">
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-8 text-center sm:gap-12">
        <div className="flex items-center gap-2">
          <LuGithub className="size-5" />
          <span>
            <span className="font-bold">
              <CountUp start={0} end={stars} delay={1} />
            </span>{' '}
            GitHub Stars
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="size-5" />
          <span>
            <span className="font-bold">
              <CountUp start={0} end={data?.signups || 863} delay={3} />
            </span>{' '}
            Happy Users
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="size-5" />
          <span>
            <span className="font-bold">
              <CountUp start={0} end={data?.resumes || 1248} delay={5} />
            </span>{' '}
            Resumes Created
          </span>
        </div>
      </div>
    </div>
  );
};
