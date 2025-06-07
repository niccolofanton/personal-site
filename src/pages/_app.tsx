// import { type Metadata } from 'next'

import { Providers } from '@/components/Providers'
import { Layout } from '@/components/Layout'
import { DefaultSeo } from 'next-seo'
import defaultSEOConfig from '../../next-seo.config'

import '@/styles/tailwind.css'
// import { Scene } from '@/components/scene'

// import { TrailScene } from '@/components/trail-scene'

export default function MyApp({ Component, pageProps, router }: any) {
  return (
    <Providers>
      <DefaultSeo {...defaultSEOConfig} />
      {/* <TrailScene className="fixed top-0 left-0 w-full h-full" /> */}

      <div className="flex w-full">
        <Layout>
          <Component key={router.route} {...pageProps} />
        </Layout>
      </div>
    </Providers>
  )
}
