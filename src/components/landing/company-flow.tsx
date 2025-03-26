'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const companies = [
  {
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png',
  },
  {
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/1200px-Microsoft_logo_%282012%29.svg.png',
  },
  {
    name: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png',
  },
  {
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png',
  },
  {
    name: 'Meta',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1200px-Meta_Platforms_Inc._logo.svg.png',
  },
  {
    name: 'Netflix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png',
  },
  {
    name: 'IBM',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1200px-IBM_logo.svg.png',
  },
  {
    name: 'Salesforce',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/1200px-Salesforce.com_logo.svg.png',
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
    <section className="bg-secondary/40 px-6 py-20 md:px-10" ref={containerRef}>
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
          <div className="absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-secondary/40 to-transparent md:w-24"></div>
          <div className="absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-secondary/40 to-transparent md:w-24"></div>

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
