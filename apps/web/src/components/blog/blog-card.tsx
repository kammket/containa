import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';

import { blogCategoriesBySlug, routes, type BlogPost } from '@emc/catalog';

import { anyListingImage, productHeroImage } from '@/lib/hero-images';
import { blurDataUrl, imageSrc } from '@/lib/images';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

export async function BlogCard({
  post,
  className,
  priority = false,
}: {
  post: BlogPost;
  className?: string;
  priority?: boolean;
}) {
  const category = blogCategoriesBySlug.get(post.categorySlug);

  // Aufmacher aus dem echten Bestand statt des Katalogbilds, das es in
  // Cloudinary nie gab – siehe hero-images.ts.
  const image = (await productHeroImage(post.relatedProducts)) ?? (await anyListingImage()) ?? post.image;

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-card-hover',
        className,
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-stone-100">
        <Image
          src={imageSrc(image.publicId, { width: 720, height: 405 })}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 92vw, 32vw"
          placeholder="blur"
          blurDataURL={blurDataUrl(image.publicId)}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          priority={priority}
        />
        {category && (
          <span className="absolute top-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-2xs font-bold text-navy-800 shadow-soft backdrop-blur-sm">
            {category.name}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-base leading-snug font-bold text-navy-900">
          <Link href={routes.blogPost(post.slug)} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-stone-600">{post.excerpt}</p>

        <div className="mt-auto flex items-center gap-3 pt-4 text-xs text-stone-500">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden>·</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden />
            {post.readingMinutes} Min. Lesezeit
          </span>
        </div>
      </div>
    </article>
  );
}
