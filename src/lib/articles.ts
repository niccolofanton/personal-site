import glob from 'fast-glob'

interface Article {
  title: string
  description: string
  author: string
  date: string
  image: any
  metadata?: {
    title: string
    description: string
  }
}

export interface ArticleWithSlug extends Article {
  slug: string
}

async function importArticle(
  articleFilename: string,
): Promise<ArticleWithSlug> {
  let { article } = (await import(`../pages/articles/${articleFilename}`)) as {
    default: React.ComponentType
    article: Article
  }

  return {
    slug: articleFilename.replace(/(\/index)?\.mdx$/, ''),
    ...article,
  }
}

export async function getAllArticles() {
  let articleFilenames = await glob('*/index.mdx', {
    cwd: './src/pages/articles',
  })

  // let articles = await Promise.all(articleFilenames.map(importArticle))
  let articles: any[] = [];

  return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date))
}
