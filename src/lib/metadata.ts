export interface SiteMetadata {
  title: string
  description: string
  url: string
  siteName: string
  locale: string
  author: {
    name: string
    email: string
    twitter: string
    linkedin: string
    github: string
  }
  defaultOgImage: string
}

export const siteMetadata: SiteMetadata = {
  title: "Niccoló Fanton - Creative Developer & Digital Designer",
  description: "Italian creative developer passionate about pushing the boundaries of web technology. Specialized in Three.js, WebGL, and immersive digital experiences that inspire and amaze.",
  url: "https://niccolofanton.dev",
  siteName: "Niccoló Fanton",
  locale: "en_US",
  author: {
    name: "Niccoló Fanton",
    email: "email@niccolofanton.dev",
    twitter: "@niccolofanton",
    linkedin: "niccolofanton",
    github: "niccolofanton"
  },
  defaultOgImage: "/images/preview.jpg"
}

export interface PageMetadata {
  title: string
  description: string
  ogImage?: string
  noIndex?: boolean
  canonical?: string
  keywords?: string[]
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export function generateMetadata(pageData: PageMetadata) {
  const fullTitle = pageData.title.includes(siteMetadata.siteName) 
    ? pageData.title 
    : `${pageData.title} - ${siteMetadata.siteName}`

  return {
    title: fullTitle,
    description: pageData.description,
    canonical: pageData.canonical || undefined,
    openGraph: {
      title: fullTitle,
      description: pageData.description,
      url: pageData.canonical || siteMetadata.url,
      siteName: siteMetadata.siteName,
      locale: siteMetadata.locale,
      type: pageData.type || 'website',
      images: [
        {
          url: pageData.ogImage || siteMetadata.defaultOgImage,
          width: 1200,
          height: 630,
          alt: pageData.title,
        },
      ],
      ...(pageData.type === 'article' && {
        publishedTime: pageData.publishedTime,
        authors: [pageData.author || siteMetadata.author.name],
        section: pageData.section,
        tags: pageData.tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      site: siteMetadata.author.twitter,
      creator: siteMetadata.author.twitter,
      title: fullTitle,
      description: pageData.description,
      images: [pageData.ogImage || siteMetadata.defaultOgImage],
    },
    additionalMetaTags: [
      {
        name: 'author',
        content: pageData.author || siteMetadata.author.name,
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'theme-color',
        content: '#ffffff',
      },
      ...(pageData.keywords && pageData.keywords.length > 0 ? [{
        name: 'keywords',
        content: pageData.keywords.join(', '),
      }] : []),
      ...(pageData.noIndex ? [{
        name: 'robots',
        content: 'noindex, nofollow',
      }] : [{
        name: 'robots',
        content: 'index, follow',
      }]),
    ],
  }
} 