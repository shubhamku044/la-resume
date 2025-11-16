'use client';
import { useEffect, useState } from 'react';

const CACHE_DURATION = 24 * 60 * 60 * 1000;

export function useGitHubStars() {
  const [stars, setStars] = useState<string | null>(() => {
    const cachedStars = localStorage.getItem('githubStars');
    const cachedTime = localStorage.getItem('githubStarsTimestamp');

    if (cachedStars && cachedTime) {
      const age = Date.now() - parseInt(cachedTime);
      if (age < CACHE_DURATION) {
        return cachedStars;
      }
    }
    return null;
  });

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/shubhamku044/la-resume');
        const data = await response.json();
        const count = data.stargazers_count;

        const formatted = count > 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString();

        localStorage.setItem('githubStars', formatted);
        localStorage.setItem('githubStarsTimestamp', Date.now().toString());
        setStars(formatted);
      } catch (error) {
        console.error('Failed to fetch GitHub stars:', error);
        const cached = localStorage.getItem('githubStars');
        setStars(cached || '–––');
      }
    };

    // Only fetch if we don't have valid cached data
    if (stars === null) {
      fetchStars();
    }
  }, [stars]);

  return stars ? +stars : 1000;
}
