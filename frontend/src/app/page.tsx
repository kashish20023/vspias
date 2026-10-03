'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'bag-food') {
      router.replace('/paper-bags/food-takeaway');
    } else if (hash === 'bag-custom') {
      router.replace('/paper-bags/retail-custom-print');
    } else if (hash === 'bag' || hash.startsWith('bag-')) {
      router.replace('/paper-bags/kraft-carry-bags');
    } else if (hash === 'collection') {
      router.replace('/paper-bags#collection-section');
    } else if (hash === 'about') {
      router.replace('/industrial-solutions#about-section');
    } else if (hash === 'printing') {
      router.replace('/printing');
    } else if (hash === 'automation') {
      router.replace('/automation');
    } else if (hash === 'contact-bags') {
      router.replace('/contact?interest=Paper%20bags');
    } else if (hash === 'contact-machines') {
      router.replace('/contact?interest=Machinery%20%26%20printing');
    } else if (hash === 'contact-automation') {
      router.replace('/contact?interest=Electrical%20%26%20automation');
    } else if (hash.startsWith('contact')) {
      router.replace('/contact');
    } else {
      router.replace('/paper-bags');
    }
  }, [router]);

  return null;
}
