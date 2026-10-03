import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BAG_DETAILS } from '@/content/bags';
import { isValidBagSlug, VALID_BAG_SLUGS } from '@/lib/routes';
import { BagDetail } from '@/components/bags/BagDetail';

interface BagDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams(): { slug: string }[] {
  return VALID_BAG_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: BagDetailPageProps): Metadata {
  if (!isValidBagSlug(params.slug)) {
    return {
      title: 'Bag Not Found — VSPIAS'
    };
  }

  const bag = BAG_DETAILS[params.slug];
  if (!bag) {
    return {
      title: 'Bag Not Found — VSPIAS'
    };
  }

  return {
    title: `${bag.title.replace(/\.$/, '')} — VSPIAS`,
    description: bag.description
  };
}

export default function BagDetailPage({ params }: BagDetailPageProps): JSX.Element {
  if (!isValidBagSlug(params.slug)) {
    notFound();
  }

  const bag = BAG_DETAILS[params.slug];
  if (!bag) {
    notFound();
  }

  return (
    <main id="main-content">
      <BagDetail bag={bag} />
    </main>
  );
}
