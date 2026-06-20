import { getStats } from '@/lib/server-stats';
import { getTranslations } from 'next-intl/server';
import { HeroInteractive } from './hero-interactive';

export const HeroSection = async () => {
  const t = await getTranslations('HomePage');
  const { stars, signups, resumes } = await getStats();

  return (
    <HeroInteractive
      title={t.rich('hero.title', {
        highlight: (chunks) => <span className="animated-text-gradient">{chunks}</span>,
      })}
      description={t('hero.description')}
      startBuildingText={t('hero.startBuilding')}
      githubButtonText={t('hero.githubButton')}
      stars={stars}
      signups={signups}
      resumes={resumes}
    />
  );
};
