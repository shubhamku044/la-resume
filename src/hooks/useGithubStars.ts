'use client';
import { useEffect, useState } from 'react';

const CACHE_DURATION = 24 * 60 * 60 * 1000;

/**
 * Returns the formatted GitHub star count, or null until it's loaded.
 *
 * Important: nothing reads localStorage during the initial render, so the
 * server and the client's first paint both render `null`. The real value is
 * only filled in after mount — this avoids the hydration mismatch that the
 * old initializer (which read localStorage synchronously) produced.
 */
export function useGitHubStars(): string | null {
  const [stars, setStars] = useState<string | null>(null);

  useEffect(() => {
    const cachedStars = localStorage?.getItem('githubStars');
    const cachedTime = localStorage?.getItem('githubStarsTimestamp');

    if (cachedStars && cachedTime && Date.now() - parseInt(cachedTime) < CACHE_DURATION) {
      setStars(cachedStars);
      return;
    }

    const fetchStars = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/shubhamku044/la-resume');
        const data = await response.json();
        const count: number = data.stargazers_count;
        const formatted = count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString();

        localStorage?.setItem('githubStars', formatted);
        localStorage?.setItem('githubStarsTimestamp', Date.now().toString());
        setStars(formatted);
      } catch (error) {
        console.error('Failed to fetch GitHub stars:', error);
        // Keep whatever was cached rather than fabricating a number.
        setStars(cachedStars ?? null);
      }
    };

    fetchStars();
  }, []);

  return stars;
}
