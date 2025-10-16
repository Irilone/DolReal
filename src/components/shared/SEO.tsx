'use client';

import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
}

const DEFAULT_TITLE = 'Dagar om Lagar 2025';
const DEFAULT_DESCRIPTION = 'Ett juridiskt symposium som utforskar lagar och samhälle';
const DEFAULT_KEYWORDS = ['juridik', 'lagar', 'symposium', 'streaming', 'live'];

export function SEO({ title, description, keywords, author }: SEOProps) {
  const pageTitle = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
  const pageDescription = description || DEFAULT_DESCRIPTION;
  const pageKeywords = keywords ? [...DEFAULT_KEYWORDS, ...keywords] : DEFAULT_KEYWORDS;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords.join(', ')} />
      {author && <meta name="author" content={author} />}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
    </Head>
  );
}
