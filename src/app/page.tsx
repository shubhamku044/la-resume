'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FileText, Rocket, Star, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { LuGithub } from 'react-icons/lu';
import { RiTwitterXFill } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import CountUp from 'react-countup';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { useGitHubStars } from '@/hooks';
import { z } from 'zod';
import { toast } from 'sonner';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTranslations } from 'next-intl';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { useGetStatsQuery } from '@/store/services/statsApi';
import { Marquee } from '@/components/magicui/marquee';
import ReviewCard from '@/components/reviewCard';
import { reviews } from '@/data/review';
const ContactSchema = z.object({
  name: z.string().min(2, 'Name is required').max(50),
  email: z.string().email(),
  message: z.string().min(100),
  honeypot: z.string(),
});

type ContactSchemaType = z.infer<typeof ContactSchema>;

export default function LaResumeLanding() {
  const stars = useGitHubStars();
  const router = useRouter();
  const t = useTranslations('HomePage');
  const { data } = useGetStatsQuery();
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactSchemaType>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      honeypot: '',
    },
  });

  const onSubmit: SubmitHandler<ContactSchemaType> = async (data: ContactSchemaType) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Message sent successfully! I'll get back to you soon.");
        reset();
      } else {
        toast.error('An error occurred while sending the message. Please try again later.');
      }
    } catch (error) {
      toast('An error occurred while sending the message. Please try again later.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-gray-900 px-4 py-2 text-center text-sm text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <LuGithub className="size-4" />
            <span>
              {t.rich('github.lovedBy', {
                stars: () => <CountUp delay={1} start={0} end={stars} />,
              })}
            </span>
          </div>
          <Link
            href="https://github.com/shubhamku044/la-resume"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-black hover:bg-gray-100"
          >
            <span>{t('github.starButton')}</span>
            <Star className="size-4 animate-star-pulse fill-yellow-500 text-yellow-600" />
          </Link>
        </div>
      </div>
      <section className="bg-white py-4 shadow-sm">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-blue-600">
                <CountUp end={data?.signups || 600} duration={2} />+
              </h2>
              <p className="text-gray-600">Signups</p>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-blue-600">
                <CountUp end={data?.resumes || 800} duration={2} />+
              </h2>
              <p className="text-gray-600">Resumes Created</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center gap-2"
          >
            <h3 className="text-sm text-gray-600">Follow the Creators</h3>
            <div className="flex">
              <a
                href="https://x.com/shubhamku044"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center rounded-full border-2 bg-gray-100 transition-transform hover:z-10 hover:scale-105"
              >
                <Avatar>
                  <AvatarImage src="https://avatars.githubusercontent.com/u/77788249?v=4" />
                  <AvatarFallback>SK</AvatarFallback>
                </Avatar>
              </a>
              <a
                href="https://x.com/prybruhta"
                target="_blank"
                rel="noopener noreferrer"
                className="-ml-2 flex flex-col items-center justify-center rounded-full border-2 bg-gray-100 transition-transform hover:z-10 hover:scale-105"
              >
                <Avatar>
                  <AvatarImage src="https://avatars.githubusercontent.com/u/95865224?v=4" />
                  <AvatarFallback>PM</AvatarFallback>
                </Avatar>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 text-center sm:px-6 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            {t.rich('hero.title', {
              highlight: (chunks) => (
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {chunks}
                </span>
              ),
            })}
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 sm:text-xl">
            {t('hero.description')}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <SignedIn>
              <Button
                size="lg"
                className="w-full shadow-lg sm:w-auto"
                onClick={() => {
                  router.push('/templates');
                }}
                variant="default"
              >
                {t('hero.startBuilding')}
                <ChevronRight />
              </Button>
            </SignedIn>
            <SignedOut>
              <SignInButton
                fallbackRedirectUrl="/templates"
                signUpFallbackRedirectUrl="/"
                mode="modal"
              >
                <Button size="lg" className="w-full shadow-lg sm:w-auto" variant="default">
                  {t('hero.startBuilding')}
                  <ChevronRight />
                </Button>
              </SignInButton>
            </SignedOut>
            <Button
              variant="secondary"
              size="lg"
              className="w-full border border-gray-400 sm:w-auto"
              onClick={() => window.open('https://github.com/shubhamku044/la-resume', '_blank')}
            >
              <LuGithub className="mr-2 size-5" />
              {t('hero.githubButton')}
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-10 flex justify-center px-4 sm:px-0"
        >
          <Image
            alt="Resume Builder"
            className="shadow-lg shadow-purple-300"
            width={1024}
            height={800}
            src="https://ik.imagekit.io/laresume/public/la-resume-mockup.webp?updatedAt=1741200085904"
          />
        </motion.div>
      </section>

      <section className="bg-white py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 sm:mb-16">
            {t('features.title')}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: t('features.feature1.title'),
                description: t('features.feature1.description'),
                icon: <FileText className="size-8 text-blue-600" />,
              },
              {
                title: t('features.feature2.title'),
                description: t('features.feature2.description'),
                icon: <Rocket className="size-8 text-purple-600" />,
              },
              {
                title: t('features.feature3.title'),
                description: t('features.feature3.description'),
                icon: <FileText className="size-8 text-green-600" />,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card className="h-full transition-all hover:border-blue-100 hover:shadow-xl">
                  <CardContent className="p-6 sm:p-8">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-blue-50">
                      {feature.icon}
                    </div>
                    <h3 className="mb-3 text-lg font-semibold sm:text-xl">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 sm:mb-16">
            {t('use.title')}
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((step) => (
              <motion.div
                key={step}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-blue-600 text-white">
                    {step}
                  </div>
                  <h3 className="mb-3 text-lg font-semibold sm:text-xl">
                    {[t('use.step1.title'), t('use.step2.title'), t('use.step3.title')][step - 1]}
                  </h3>
                  <p className="text-gray-600">
                    {
                      [
                        t('use.step1.description'),
                        t('use.step2.description'),
                        t('use.step3.description'),
                      ][step - 1]
                    }
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 dark:bg-gray-900 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-gray-100 sm:mb-16">
            What Our Users Say
          </h2>
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s]">
              {firstRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
              {secondRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
          </div>
        </div>
      </section>
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 sm:mb-12">
            {t('feedback.title')}
          </h2>
          <div className="mx-auto max-w-2xl">
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl">
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Input
                      placeholder={t('feedback.card.name')}
                      {...register('name')}
                      className="w-full"
                    />
                    {errors.name && (
                      <p className="mt-1 text-left text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Input
                      placeholder={t('feedback.card.email')}
                      type="email"
                      {...register('email')}
                      className="w-full"
                    />
                    {errors.email && (
                      <p className="mt-1 text-left text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Textarea
                      placeholder={t('feedback.card.message')}
                      {...register('message')}
                      className="min-h-[120px] w-full bg-transparent"
                    />
                    {errors.message && (
                      <p className="mt-1 text-left text-sm text-red-500">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <input type="hidden" id="honeypot" {...register('honeypot')} />

                  <Button
                    type="submit"
                    className="w-full bg-black text-white hover:bg-gray-800"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? t('feedback.card.buttonsending')
                      : t('feedback.card.buttonsend')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 sm:mb-12">
            {t('pricing.title')}
          </h2>
          <p className="text-center text-lg text-gray-600">{t('pricing.description')}</p>

          <div className="mx-auto mt-8 max-w-4xl">
            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-purple-50">
              <CardContent className="p-6 sm:p-12">
                <div className="text-center">
                  <div className="mb-8">
                    <span className="text-5xl font-bold text-gray-900">
                      {t('pricing.card.title')}
                    </span>
                    <p className="mt-2 text-gray-600">{t('pricing.card.description')}</p>
                  </div>

                  <div className="grid gap-6 text-left md:grid-cols-2">
                    <div className="space-y-4">
                      {[
                        t('pricing.card.points.point1'),
                        t('pricing.card.points.point2'),
                        t('pricing.card.points.point3'),
                        t('pricing.card.points.point4'),
                      ].map((feature) => (
                        <div key={feature} className="flex items-center gap-3">
                          <CheckCircle2 className="size-5 text-green-600" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      {[
                        t('pricing.card.points.point1'),
                        t('pricing.card.points.point2'),
                        t('pricing.card.points.point3'),
                        t('pricing.card.points.point4'),
                      ].map((feature) => (
                        <div key={feature} className="flex items-center gap-3">
                          <CheckCircle2 className="size-5 text-green-600" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
                    <SignedIn>
                      <Button
                        size="lg"
                        className="w-full shadow-lg sm:w-auto"
                        onClick={() => router.push('/templates')}
                        variant="default"
                      >
                        {t('pricing.card.button')}
                      </Button>
                    </SignedIn>
                    <SignedOut>
                      <SignInButton
                        fallbackRedirectUrl="/templates"
                        signUpFallbackRedirectUrl="/"
                        mode="modal"
                      >
                        <Button size="lg" className="w-full shadow-lg sm:w-auto" variant="default">
                          {t('pricing.card.button')}
                        </Button>
                      </SignInButton>
                    </SignedOut>
                  </div>

                  <p className="mt-6 text-sm text-gray-600">{t('pricing.card.sentence')}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <p className="mt-12 text-center text-gray-600">
            {t('random.title')} •{' '}
            <Link
              href="https://github.com/shubhamku044/la-resume"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              {t('random.button')}
            </Link>
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 text-center sm:px-6">
          <div className="rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 px-6 py-12 text-white shadow-2xl sm:rounded-2xl sm:px-8 sm:py-16">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">{t('random.heading')}</h2>
            <p className="mb-6 text-sm text-blue-100 sm:text-lg">{t('random.description')}</p>
            <div className="flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
              <SignedIn>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 border border-gray-300 px-6 py-3 text-black hover:bg-white/10 sm:flex-none"
                  onClick={() => router.push('/templates')}
                >
                  {t('random.button2')}
                </Button>
              </SignedIn>
              <SignedOut>
                <SignInButton
                  fallbackRedirectUrl="/templates"
                  signUpFallbackRedirectUrl="/"
                  mode="modal"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 border border-gray-300 px-6 py-3 text-black hover:bg-white/10 sm:flex-none"
                  >
                    {t('random.button2')}
                  </Button>
                </SignInButton>
              </SignedOut>
              <Button
                variant="outline"
                size="lg"
                className="flex-1 border border-gray-300 px-6 py-3 text-black hover:bg-white/10 sm:flex-none"
                onClick={() => window.open('https://github.com/shubhamku044/la-resume', '_blank')}
              >
                <LuGithub className="mr-2 size-5" />
                {t('github.starButton')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 sm:mb-16">
            {t('developers.title')}
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Card className="h-full transition-all hover:border-purple-100 hover:shadow-xl">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-col items-center text-center">
                    <Image
                      src="https://avatars.githubusercontent.com/u/77788249?v=4"
                      alt="Shubham Kumar"
                      width={120}
                      height={120}
                      className="mb-4 rounded-full border-4 border-purple-100"
                    />
                    <h3 className="mb-2 text-2xl font-bold text-gray-900">
                      {t('developers.details.dev1.name')}
                    </h3>
                    <p className="mb-4 text-gray-600">{t('developers.details.dev1.role')}</p>
                    <div className="mb-6 flex gap-4">
                      <Link
                        href="https://github.com/shubhamku044"
                        target="_blank"
                        className="text-gray-600 transition-colors hover:text-gray-900"
                      >
                        <LuGithub className="size-6" />
                      </Link>
                      <Link
                        href="https://x.com/shubhamku044"
                        target="_blank"
                        className="text-gray-600 transition-colors hover:text-gray-900"
                      >
                        <RiTwitterXFill className="size-6" />
                      </Link>
                    </div>
                    <Button
                      asChild
                      variant="default"
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      <a href="mailto:shubhamku044@gmail.com">{t('developers.button')} →</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Card className="h-full transition-all hover:border-blue-100 hover:shadow-xl">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-col items-center text-center">
                    <Image
                      src="https://avatars.githubusercontent.com/u/95865224?v=4"
                      alt="Friend Name"
                      width={120}
                      height={120}
                      className="mb-4 rounded-full border-4 border-blue-100"
                    />
                    <h3 className="mb-2 text-2xl font-bold text-gray-900">
                      {t('developers.details.dev2.name')}
                    </h3>
                    <p className="mb-4 text-gray-600">{t('developers.details.dev2.role')}</p>
                    <div className="mb-6 flex gap-4">
                      <Link
                        href="https://www.github.com/PriyabrataMo"
                        target="_blank"
                        className="text-gray-600 transition-colors hover:text-gray-900"
                      >
                        <LuGithub className="size-6" />
                      </Link>
                      <Link
                        href="https://x.com/prybruhta"
                        target="_blank"
                        className="text-gray-600 transition-colors hover:text-gray-900"
                      >
                        <RiTwitterXFill className="size-6" />
                      </Link>
                    </div>
                    <Button
                      asChild
                      variant="default"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <a href="mailto:priyabrata8558@gmail.com">{t('developers.button')} →</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 sm:mb-16">
            {t('faq.title')}
          </h2>
          <Accordion type="single" collapsible className="mx-auto max-w-3xl">
            {[
              {
                question: t('faq.question1.question'),
                answer: t('faq.question1.answer'),
              },
              {
                question: t('faq.question2.question'),
                answer: t('faq.question2.answer'),
              },
              {
                question: t('faq.question3.question'),
                answer: t('faq.question3.answer'),
              },
            ].map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="mb-4 rounded-lg border border-gray-200 px-4 sm:px-6"
              >
                <AccordionTrigger className="flex w-full items-center justify-between py-4 text-left font-semibold">
                  <span className="text-base sm:text-lg">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <h3 className="mb-2 text-lg font-semibold">La-Resume</h3>
              <p className="text-gray-600">{t('footer.detail')}</p>
            </div>
            <div className="flex gap-6">
              <Link
                href="https://github.com/shubhamku044/la-resume"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <LuGithub className="size-5" />
                <span>GitHub</span>
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-gray-600 sm:mt-8">
            © {new Date().getFullYear()} {t('footer.privacyPolicy')}
          </div>
        </div>
      </footer>
    </div>
  );
}
