export default function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        'name': 'La-Resume',
        'url': 'https://la-resume.tech',
        'logo': 'https://la-resume.tech/icon.png',
        'sameAs': ['https://github.com/shubhamku044/la-resume'],
      },
      {
        '@type': 'SoftwareApplication',
        'name': 'La-Resume',
        'applicationCategory': 'BusinessApplication',
        'operatingSystem': 'Web',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD',
        },
      },
      {
        '@type': 'WebSite',
        'name': 'La-Resume',
        'url': 'https://la-resume.tech',
        'potentialAction': {
          '@type': 'SearchAction',
          'target': 'https://la-resume.tech/?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
