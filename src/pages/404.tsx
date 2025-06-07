import { NextSeo } from 'next-seo'
import { generateMetadata } from '@/lib/metadata'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

export default function NotFound() {
  const seoData = generateMetadata({
    title: '404 - Page Not Found',
    description: 'The page you are looking for could not be found.',
    noIndex: true,
  })

  return (
    <>
      <NextSeo {...seoData} />
      <Container className="flex h-full items-center pt-16 sm:pt-32">
        <div className="flex flex-col items-center">
          <p className="text-base font-semibold text-zinc-400 dark:text-zinc-500">
            404
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Page not found
          </h1>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
          <Button href="/" variant="secondary" className="mt-4">
            Go back home
          </Button>
        </div>
      </Container>
    </>
  )
}
