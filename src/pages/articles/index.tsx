import { PageAnimation } from '@/components/PageAnimation'
import { SimpleLayout } from '@/components/SimpleLayout'
import { type Article } from '@/lib/articles'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import { generateMetadata } from '@/lib/metadata'
import { generateBlogStructuredData, generateBreadcrumbStructuredData } from '@/lib/structured-data'
import { SEOHead } from '@/components/SEOHead'
import { Card } from '@/components/Card'
import { formatDate } from '@/lib/formatDate'

const articles: Article[] = [
  {
    title: 'Building a Real-Time Dithering Shader',
    description: 'A minimal, real-time WebGL shader that applies ordered dithering and optional pixelation as a composable postprocessing effect.',
    date: '2025-06-04',
    author: 'Niccoló Fanton',
    image: '3.jpg',
    link: {
      newTab: true,
      url: 'https://tympanus.net/codrops/2025/06/04/building-a-real-time-dithering-shader'
    }
  },
  {
    title: 'Living the Era of Hyper-Democratization',
    description: 'We are living through a fracture in how value, effort, and identity are defined',
    date: '2025-05-25',
    author: 'Niccoló Fanton',
    image: '2.jpg',
    link: {
      newTab: true,
      url: 'https://medium.com/@niccolofanton/living-the-era-of-hyper-democratization-dd22020ff160'
    }
  },
  {
    title: 'We, the Flawless Product of a Never-Ending Experiment',
    description: 'Reflections on humanity as an ongoing evolutionary project',
    date: '2025-05-17',
    author: 'Niccoló Fanton',
    image: '1.webp',
    link: {
      newTab: true,
      url: 'https://medium.com/@niccolofanton/we-the-flawless-product-of-a-never-ending-experiment-d9210ee5eb66'
    }
  },
  {
    title: 'Building Efficient Three.js Scenes',
    description: 'Optimize performance while maintaining quality in your 3D web applications',
    date: '2025-02-11',
    author: 'Niccoló Fanton',
    image: 'singularity.png',
    link: {
      newTab: true,
      url: 'https://tympanus.net/codrops/2025/02/11/building-efficient-three-js-scenes-optimize-performance-while-maintaining-quality/'
    }
  },
]
function Article({ article }: { article: Article }) {
  return (
    <article className="">
      <Card className="relative">
        <div className="flex flex-col md:flex-row w-full">
          <div className="w-full md:w-auto md:flex-shrink-0 mb-4 md:mb-0 flex items-center">
            <Card.Image src={article.image} alt={article.title} className="w-full md:w-[280px] h-auto" />
          </div>
          <div className="flex flex-col md:ml-6">
            <Card.Title>
              {article.title}
            </Card.Title>
            <Card.Eyebrow
              as="time"
              dateTime={article.date}
              className=""
              decorate
            >
              {formatDate(article.date)}
            </Card.Eyebrow>
            <Card.Description>{article.description}</Card.Description>
            <Card.Cta href={article.link.url} newTab={article.link.newTab}>Read article</Card.Cta>
          </div>
        </div>
      </Card>
    </article>
  )
}

export const metadata = {
  title: 'Technical Articles & Insights - Niccoló Fanton',
  description: 'In-depth articles on advanced web development techniques, Three.js mastery, WebGL shaders, and creative coding insights from a professional developer\'s perspective.',
  keywords: ['web development articles', 'three.js tutorials', 'webgl shaders', 'creative coding blog', 'javascript tutorials', 'react techniques', 'technical writing', 'programming insights', 'front-end development'],
}

export const getStaticProps = (async () => {
  return { props: { data: articles } }
}) satisfies GetStaticProps<{
  data: Article[]
}>

export default function ArticlesIndex({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
  const seoData = generateMetadata({
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    type: 'website',
    canonical: 'https://niccolofanton.dev/articles',
  })

  const structuredArticles = data.map(article => ({
    title: article.title,
    description: article.description,
    date: article.date,
    author: article.author,
    image: `/images/articles/${article.image}`,
    url: article.link.url,
    tags: ['Web Development', 'Creative Coding']
  }))

  const structuredData = [
    generateBlogStructuredData(structuredArticles),
    generateBreadcrumbStructuredData([
      { name: 'Home', url: 'https://niccolofanton.dev' },
      { name: 'Articles', url: 'https://niccolofanton.dev/articles' }
    ])
  ]

  return (
    <PageAnimation>
      <NextSeo {...seoData} />
      <SEOHead structuredData={structuredData} />
      <SimpleLayout
        title="Writing on stuff I've learned on the way."
        intro="Long-form thoughts on coding, life, and more, collected in chronological order."
      >
        <div className="">
          <div className="flex max-w-3xl flex-col space-y-16">
            {data.map((article) => (
              <Article article={article} key={article.title} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </PageAnimation>
  )
}
