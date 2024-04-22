
// import { type Metadata } from 'next'

import { Providers } from '@/components/Providers'
import { Layout } from '@/components/Layout'
import { NextSeo } from 'next-seo';

import '@/styles/tailwind.css'
// import { Scene } from '@/components/scene'

// import { TrailScene } from '@/components/trail-scene'

export const metadata = {
  title: {
    template: '%s - Niccoló Fanton',
    default:
      'Home - Niccoló Fanton',
  },
  description:
    `My name is Niccolò Fanton, I'm a developer based Italy.
     I have a profound love for design and I consider my work as an extension of myself.
     I'm an explorer of hidden meanings, I chase life with an insatiable thirst for
     understanding.`,
  // alternates: {
  //   types: {
  //     'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
  //   },
  // },
}

export default function MyApp({ Component, pageProps, router }: any) {
  return (
    <Providers>

      <NextSeo
        title={metadata.title.default}
        description={metadata.description}
      />
      {/* <TrailScene className="fixed top-0 left-0 w-full h-full" /> */}

      <div className="flex w-full">
        <Layout>
          <Component key={router.route} {...pageProps} />
        </Layout>
      </div>
    </Providers>
  )
}
