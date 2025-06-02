import { PageAnimation } from '@/components/PageAnimation'
import { SimpleLayout } from '@/components/SimpleLayout'
import { type Article } from '@/lib/articles'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import { Card } from '@/components/Card'
import { formatDate } from '@/lib/formatDate'

const articles: Article[] = [
  {
    title: 'Living the Era of Hyper-Democratization',
    description: 'We are living through a fracture in how value, effort, and identity are defined',
    date: '2025-06-02',
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
  title: 'Articles',
  description:
    'Long-form thoughts on coding, life, and more, collected in chronological order.',
}

export const getStaticProps = (async () => {
  return { props: { data: articles } }
}) satisfies GetStaticProps<{
  data: Article[]
}>

export default function ArticlesIndex({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PageAnimation>
      <NextSeo
        title={metadata.title}
        description={metadata.description}
      />
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
