/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: 'Niccoló Fanton - Creative Developer & Digital Designer',
  description: 'Italian creative developer passionate about pushing the boundaries of web technology. Specialized in Three.js, WebGL, and immersive digital experiences that inspire and amaze.',
  canonical: 'https://niccolofanton.dev',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://niccolofanton.dev',
    siteName: 'Niccoló Fanton',
    title: 'Niccoló Fanton - Creative Developer & Digital Designer',
    description: 'Italian creative developer passionate about pushing the boundaries of web technology. Specialized in Three.js, WebGL, and immersive digital experiences.',
    images: [
      {
        url: 'https://niccolofanton.dev/images/preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Niccoló Fanton - Creative Developer',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    handle: '@niccolofanton',
    site: '@niccolofanton',
    cardType: 'summary_large_image',
    image: 'https://niccolofanton.dev/images/preview.jpg',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'author',
      content: 'Niccoló Fanton',
    },
    {
      name: 'theme-color',
      content: '#ffffff',
    },
    {
      name: 'keywords',
      content: 'creative developer, three.js developer, webgl expert, react developer, next.js, digital designer, 3d web experiences, shader programming, interactive design, italy developer',
    },
    // Additional meta tags for better social media compatibility
    {
      property: 'og:image:secure_url',
      content: 'https://niccolofanton.dev/images/preview.jpg',
    },
    {
      name: 'twitter:title',
      content: 'Niccoló Fanton - Creative Developer & Digital Designer',
    },
    {
      name: 'twitter:description',
      content: 'Italian creative developer passionate about pushing the boundaries of web technology. Specialized in Three.js, WebGL, and immersive digital experiences.',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/images/preview.jpg',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
  ],
}

export default defaultSEOConfig 