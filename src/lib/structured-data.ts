import { siteMetadata } from './metadata'

export interface Article {
  title: string
  description: string
  date: string
  author: string
  image: string
  url: string
  tags?: string[]
  readingTime?: number
}

export interface Project {
  name: string
  description: string
  url: string
  image?: string
  technologies?: string[]
  dateCreated?: string
}

export function generatePersonStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteMetadata.author.name,
    url: siteMetadata.url,
    image: siteMetadata.defaultOgImage,
    jobTitle: 'Creative Developer & Digital Designer',
    description: siteMetadata.description,
    sameAs: [
      `https://twitter.com/${siteMetadata.author.twitter.replace('@', '')}`,
      `https://linkedin.com/in/${siteMetadata.author.linkedin}`,
      `https://github.com/${siteMetadata.author.github}`,
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
    knowsAbout: [
      'Web Development',
      'Three.js',
      'WebGL',
      'React',
      'Next.js',
      'Creative Coding',
      'Digital Design',
      '3D Graphics',
      'Shader Programming'
    ]
  }
}

export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteMetadata.siteName,
    url: siteMetadata.url,
    description: siteMetadata.description,
    author: {
      '@type': 'Person',
      name: siteMetadata.author.name,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteMetadata.url}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  }
}

export function generateArticleStructuredData(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image.startsWith('http') ? article.image : `${siteMetadata.url}${article.image}`,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: article.author,
      url: siteMetadata.url,
    },
    publisher: {
      '@type': 'Person',
      name: siteMetadata.author.name,
      logo: {
        '@type': 'ImageObject',
        url: siteMetadata.defaultOgImage,
      },
    },
    url: article.url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
    ...(article.tags && {
      keywords: article.tags.join(', '),
    }),
    ...(article.readingTime && {
      timeRequired: `PT${article.readingTime}M`,
    }),
  }
}

export function generateBlogStructuredData(articles: Article[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${siteMetadata.siteName} - Technical Articles`,
    description: 'Curated collection of technical articles published on external platforms like Medium and Codrops',
    url: `${siteMetadata.url}/articles`,
    author: {
      '@type': 'Person',
      name: siteMetadata.author.name,
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          headline: article.title,
          description: article.description,
          url: article.url,
          datePublished: article.date,
          author: {
            '@type': 'Person',
            name: article.author,
          },
        },
      })),
    },
  }
}

export function generateProjectStructuredData(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.description,
    url: project.url,
    creator: {
      '@type': 'Person',
      name: siteMetadata.author.name,
      url: siteMetadata.url,
    },
    ...(project.image && {
      image: project.image.startsWith('http') ? project.image : `${siteMetadata.url}${project.image}`,
    }),
    ...(project.dateCreated && {
      dateCreated: project.dateCreated,
    }),
    ...(project.technologies && {
      keywords: project.technologies.join(', '),
    }),
  }
}

export function generatePortfolioStructuredData(projects: Project[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWorkSeries',
    name: `${siteMetadata.siteName} - Creative Portfolio`,
    description: 'Portfolio of innovative web projects, 3D experiences, and cutting-edge digital solutions',
    url: `${siteMetadata.url}/projects`,
    creator: {
      '@type': 'Person',
      name: siteMetadata.author.name,
      url: siteMetadata.url,
    },
    hasPart: projects.map(project => ({
      '@type': 'CreativeWork',
      name: project.name,
      description: project.description,
      url: project.url,
    })),
  }
}

export function generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
} 