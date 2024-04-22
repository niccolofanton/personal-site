// import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { PageAnimation } from '@/components/PageAnimation'
import { SimpleLayout } from '@/components/SimpleLayout'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Article } from '../index'

// function Article({ article }: { article: ArticleWithSlug }) {
//   return (
//     <article className="md:grid md:grid-cols-4 md:items-baseline">
//       <Card className="md:col-span-3">
//         <Card.Title href={`/articles/${article.slug}`}>
//           {article.title}
//         </Card.Title>
//         <Card.Eyebrow
//           as="time"
//           dateTime={article.date}
//           className="md:hidden"
//           decorate
//         >
//           {formatDate(article.date)}
//         </Card.Eyebrow>
//         <Card.Description>{article.description}</Card.Description>
//         <Card.Cta>Read article</Card.Cta>
//       </Card>
//       <Card.Eyebrow
//         as="time"
//         dateTime={article.date}
//         className="mt-1 hidden md:block"
//       >
//         {formatDate(article.date)}
//       </Card.Eyebrow>
//     </article>
//   )
// }

// export const metadata: Metadata = {
//   title: 'Articles',
//   description:
//     'All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.',
// }

export const getStaticProps = (async (context: any) => {
  return { props: { data: await getAllArticles() } }
}) satisfies GetStaticProps<{
  data: ArticleWithSlug[]
}>

export default function ArticlesIndex({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
  let articles = data;

  return (
    <PageAnimation>
      <SimpleLayout
        title="Writing on cool stuff I've learned on the way."
        intro="long-form thoughts on coding, life, and more, collected in chronological order."
      >
        <div className="">
          <div className="flex max-w-2xl flex-col space-y-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} playHomeAnimation={false} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </PageAnimation>

  )
}
