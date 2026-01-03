import { Card, CardContent } from '@/components/ui/card';
import { Github, Mail, Twitter } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

export const TeamSection = async () => {
  const t = await getTranslations('HomePage');
  const creators = [
    {
      name: t('team.member1.name'),
      role: t('team.member1.role'),
      description: t('team.member1.description'),
      image: '/shubham.jpeg',
      github: 'https://github.com/shubhamku044',
      twitter: 'https://x.com/shubhamku044',
      email: 'shubhamku044@gmail.com',
    },
    {
      name: t('team.member2.name'),
      role: t('team.member2.role'),
      description: t('team.member2.description'),
      image: '/priyo.jpeg',
      github: 'https://www.github.com/PriyabrataMo',
      twitter: 'https://x.com/prybruhta',
      email: 'priyabrata8558@gmail.com',
    },
  ];

  return (
    <section className="py-20 md:py-32" id="team">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
            {t('team.intro')}
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            {t('team.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            {t('team.description')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {creators.map((creator, index) => (
            <div key={index} className="relative group transition-transform hover:-translate-y-1">
              <Card className="h-full overflow-hidden border-0 shadow-xl">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Profile Image Section */}
                    <div className="relative h-64 md:h-auto md:w-1/3">
                      <Image
                        src={creator.image}
                        alt={creator.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-all ease-in duration-300"
                        unoptimized
                      />
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:w-2/3 md:p-8">
                      {/* Small Avatar next to Name */}
                      <div className="flex items-center space-x-4">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {creator.name}
                        </h3>
                      </div>
                      <p className="mb-4 -mt-2 text-purple-600 dark:text-purple-300">
                        {creator.role}
                      </p>
                      <p className="mb-6 text-gray-600 dark:text-gray-300">{creator.description}</p>
                      <div className="flex space-x-4">
                        <Link
                          href={creator.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`GitHub profile of ${creator.name}`}
                          className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          <Github className="size-5" />
                        </Link>
                        <Link
                          href={creator.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Twitter profile of ${creator.name}`}
                          className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          <Twitter className="size-5" />
                        </Link>
                        <Link
                          href={`mailto:${creator.email}`}
                          aria-label={`Email ${creator.name}`}
                          className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          <Mail className="size-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
