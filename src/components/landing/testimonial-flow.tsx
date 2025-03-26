// src/components/ReviewsMarquee.tsx

'use client';

import { Marquee } from '@/components/magicui/marquee';
import ReviewCard from './review-card';
import { reviews } from '@/data/review';

const ReviewsMarquee = ({ className }: { className?: string }) => {
  // Split the reviews for the two marquee rows
  const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
  const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

  return (
    <div
      className={`relative flex w-full flex-col items-center justify-center overflow-hidden ${className}`}
    >
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
  );
};

export default ReviewsMarquee;
