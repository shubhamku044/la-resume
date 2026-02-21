import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { getAssetUrl } from '@/lib/assets';

const ReviewCard = ({
  name,
  username,
  profileUrl,
  body,
  avatar,
}: {
  name: string;
  username: string;
  social: string;
  profileUrl: string;
  body: string;
  avatar: string;
}) => {
  const imgSrc = avatar;

  return (
    <figure
      className={cn(
        'relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4',
        // light styles
        'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        // dark styles
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]'
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          src={getAssetUrl(imgSrc)}
          alt={name}
          width={32}
          height={32}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">{name}</figcaption>
          <Link
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium hover:underline dark:text-white/40"
            referrerPolicy="no-referrer"
          >
            {username}
          </Link>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export default ReviewCard;
