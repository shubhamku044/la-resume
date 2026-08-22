import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Users } from 'lucide-react';

// Enhanced testimonials data
const testimonials = [
  {
    quote:
      'This resume builder helped me land interviews at top tech companies. The templates are clean, professional, and ATS-friendly.',
    author: 'Sarah Johnson',
    role: 'Software Engineer',
  },
  {
    quote:
      'I was struggling to create a resume that stood out. This tool made it incredibly easy, and I received multiple interview calls within a week.',
    author: 'Michael Chen',
    role: 'Product Manager',
  },
  {
    quote:
      'After using this resume builder, I got more responses from employers than I had in months of sending out my old resume.',
    author: 'Emily Rodriguez',
    role: 'Marketing Specialist',
  },
  {
    quote:
      'The ATS optimization feature is game-changing. I started getting callbacks almost immediately after switching to this resume format.',
    author: 'David Kim',
    role: 'Data Scientist',
  },
  {
    quote:
      'Clean, professional templates and an intuitive interface. This resume builder took the stress out of job applications.',
    author: 'Jessica Taylor',
    role: 'UX Designer',
  },
];

export const TestimonialsCarousel = () => {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-1">
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="h-full">
              <Card className="h-full overflow-hidden border border-border-default bg-surface-raised">
                <div className="absolute -right-10 -top-10 size-40 rounded-full bg-primary/10 opacity-30" />
                <CardContent className="relative p-6">
                  <div className="mb-4 text-4xl text-primary/50">&apos;</div>
                  <p className="mb-6 text-gray-700 dark:text-gray-300">{testimonial.quote}</p>
                  <div className="mt-auto flex items-center">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary-soft">
                      <Users className="size-5 text-primary" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-primary-ink">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-6 flex justify-center gap-2">
        <CarouselPrevious className="relative dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 lg:left-0" />
        <CarouselNext className="relative dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 lg:right-0" />
      </div>
    </Carousel>
  );
};
