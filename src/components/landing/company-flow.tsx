'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const companies = [
  {
    name: 'Google',
    logo: 'https://ik.imagekit.io/laresume/logos/Google_2015_logo.svg?updatedAt=1743017795860',
  },
  {
    name: 'Microsoft',
    logo: 'https://ik.imagekit.io/laresume/logos/Microsoft_logo_(2012).svg?updatedAt=1743017795965',
  },
  {
    name: 'Apple',
    logo: 'https://ik.imagekit.io/laresume/logos/Apple_logo_black.svg?updatedAt=1743017796040',
  },
  {
    name: 'Amazon',
    logo: 'https://ik.imagekit.io/laresume/logos/Amazon_logo.svg?updatedAt=1743017796010',
  },
  {
    name: 'Meta',
    logo: 'https://ik.imagekit.io/laresume/logos/Meta_Platforms_Inc._logo.svg?updatedAt=1743017796023',
  },
  {
    name: 'Netflix',
    logo: 'https://ik.imagekit.io/laresume/logos/Netflix_2015_logo.svg?updatedAt=1743017795852',
  },
  {
    name: 'IBM',
    logo: 'https://ik.imagekit.io/laresume/logos/IBM_logo.svg?updatedAt=1743017795968',
  },
  {
    name: 'Salesforce',
    logo: 'https://ik.imagekit.io/laresume/logos/Salesforce.com_logo.svg?updatedAt=1743017795901',
  },
];

const CompaniesSec = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="bg-secondary/40  lg:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
 px-6 py-20 md:px-10"
      ref={containerRef}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-foreground/70"
          >
            Create resumes that help you land jobs at top companies
          </motion.p>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-secondary/40 dark:from-gray-800/40 to-transparent md:w-24" />
          <div className="absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-secondary/40 dark:from-gray-800/40 to-transparent md:w-24" />

          <motion.div
            className="flex space-x-12 md:space-x-16"
            animate={{ x: ['0%', '-100%'] }}
            transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
          >
            {companies.concat(companies).map((company, index) => (
              <div
                key={index}
                className="flex h-12 w-24 shrink-0 items-center justify-center opacity-70 transition-opacity hover:opacity-100 md:h-16 md:w-32"
              >
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={128}
                  height={64}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompaniesSec;
