import { getTranslations } from 'next-intl/server';
import { HeroInteractive } from './hero-interactive';

export const HeroSection = async () => {
  const t = await getTranslations('HomePage');

  return (
    <HeroInteractive
      title={t.rich('hero.title', {
        highlight: (chunks) => <span className="animated-text-gradient">{chunks}</span>,
      })}
      description={t('hero.description')}
      startBuildingText={t('hero.startBuilding')}
      githubButtonText={t('hero.githubButton')}
    />
  );
};
