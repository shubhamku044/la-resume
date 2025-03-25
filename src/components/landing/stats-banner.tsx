import React from 'react';
import { FileText, Github, Users } from 'lucide-react';

interface StatsBannerProps {
  stats: {
    stars: number;
    signups: number;
    resumes: number;
  };
}

export const StatsBanner = ({ stats }: StatsBannerProps) => {
  return (
    <div className="bg-gray-900 px-4 py-3 text-white dark:bg-gray-800">
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-8 text-center sm:gap-12">
        <div className="flex items-center gap-2">
          <Github className="size-5" />
          <span>
            <span className="font-bold">{stats.stars}</span> GitHub Stars
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="size-5" />
          <span>
            <span className="font-bold">{stats.signups}</span> Happy Users
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="size-5" />
          <span>
            <span className="font-bold">{stats.resumes}</span> Resumes Created
          </span>
        </div>
      </div>
    </div>
  );
};
