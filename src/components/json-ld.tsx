export default function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        'name': 'La-Resume',
        'url': 'https://la-resume.com',
        'logo': 'https://la-resume.com/icon-512.png',
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
        'url': 'https://la-resume.com',
      },
      {
        '@type': 'SiteNavigationElement',
        'name': ['Resume Templates', 'Features', 'Pricing', 'FAQ', 'Contact'],
        'url': [
          'https://la-resume.com/resume-templates',
          'https://la-resume.com/features',
          'https://la-resume.com/pricing',
          'https://la-resume.com/faq',
          'https://la-resume.com/contact-us',
        ],
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
