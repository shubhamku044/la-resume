import { getStats } from '@/lib/server-stats';
import { StatsBannerInteractive } from './stats-banner-interactive';

export const StatsBanner = async () => {
  const { stars, signups, resumes } = await getStats();

  return <StatsBannerInteractive stars={stars} signups={signups} resumes={resumes} />;
};
