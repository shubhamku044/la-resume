import prisma from '@/lib/prisma';

interface StatsData {
  stars: number;
  signups: number;
  resumes: number;
}

export async function getStats(): Promise<StatsData> {
  const [stars, signups, resumes] = await Promise.all([
    getGitHubStars(),
    getPlatformStats('signups'),
    getPlatformStats('resumes'),
  ]);

  return { stars, signups, resumes };
}

async function getGitHubStars(): Promise<number> {
  try {
    const response = await fetch('https://api.github.com/repos/shubhamku044/la-resume', {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!response.ok) {
      // Fallback to a reasonable default if rate limited or error
      return 1000;
    }

    const data = await response.json();
    return data.stargazers_count;
  } catch (error) {
    console.error('Failed to fetch GitHub stars:', error);
    return 1000;
  }
}

async function getPlatformStats(type: 'signups' | 'resumes'): Promise<number> {
  try {
    if (type === 'signups') {
      return await prisma.user.count();
    } else {
      return await prisma.resume.count();
    }
  } catch (error) {
    console.error(`Failed to fetch ${type} count:`, error);
    // Return fallback values matching the original client-side fallbacks
    return type === 'signups' ? 863 : 1248;
  }
}
