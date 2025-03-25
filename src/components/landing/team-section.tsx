'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Github, Twitter, Mail } from 'lucide-react';

export const TeamSection = () => {
  const creators = [
    {
      name: 'Alex Morgan',
      role: 'Lead Developer',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&auto=format&fit=crop',
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      email: 'alex@resumebuilder.com',
    },
    {
      name: 'Jamie Wilson',
      role: 'UI/UX Designer',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop',
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      email: 'jamie@resumebuilder.com',
    },
  ];

  return (
    <section className="py-20 md:py-32" id="team">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-block rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
            Meet Our Team
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            The creators behind Resume Builder
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Passionate developers dedicated to helping you create professional, standout resumes
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {creators.map((creator, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="relative"
            >
              <Card className="h-full overflow-hidden border-0 shadow-xl">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <img
                        src={creator.image}
                        alt={creator.name}
                        className="size-full object-cover md:h-full"
                      />
                    </div>
                    <div className="p-6 md:w-2/3 md:p-8">
                      <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                        {creator.name}
                      </h3>
                      <p className="mb-4 text-purple-600 dark:text-purple-300">{creator.role}</p>
                      <p className="mb-6 text-gray-600 dark:text-gray-300">
                        Passionate about creating tools that help people succeed in their career
                        journey.
                      </p>
                      <div className="flex space-x-4">
                        <a
                          href={creator.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          <Github className="size-5" />
                        </a>
                        <a
                          href={creator.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          <Twitter className="size-5" />
                        </a>
                        <a
                          href={`mailto:${creator.email}`}
                          className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          <Mail className="size-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
