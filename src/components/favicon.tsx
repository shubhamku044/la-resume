'use client';

import { useEffect, useState } from 'react';

export default function Favicon() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const updateFavicon = () => {
      const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const favicon = darkMode ? '/favicon-light.ico' : '/favicon-dark.ico';

      const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (link) {
        link.href = favicon;
      } else {
        const newLink = document.createElement('link');
        newLink.rel = 'icon';
        newLink.href = favicon;
        document.head.appendChild(newLink);
      }
    };

    updateFavicon();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', updateFavicon);
    };
  }, [mounted]);

  return null;
}
