import Link from 'next/link'
import { NextSeo } from 'next-seo'

import { Card } from '@/components/Card'
import { PageAnimation } from '@/components/PageAnimation'
import { ProjectCard } from '@/components/ProjectCard'
import { SEOHead } from '@/components/SEOHead'
import { SimpleLayout } from '@/components/SimpleLayout'
import { demos } from '@/lib/demos'
import { generateMetadata } from '@/lib/metadata'
import {
  generateBreadcrumbStructuredData,
  generatePortfolioStructuredData,
} from '@/lib/structured-data'

export const metadata = {
  title: 'WebGL & three.js Demos',
  description:
    'Thirty-two interactive three.js, WebGL and WebGPU demos — post-processing, GPGPU particles, gaussian splatting, TSL shaders and physics — each one live in the browser.',
  keywords: [
    'three.js demos',
    'webgl demos',
    'webgpu',
    'tsl shaders',
    'react three fiber',
    'glsl post-processing',
    'creative coding',
  ],
}

export default function Demos() {
  const seoData = generateMetadata({
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    type: 'website',
    canonical: 'https://niccolofanton.dev/demos',
  })

  const structuredData = [
    generatePortfolioStructuredData(
      demos.map((demo) => ({
        name: demo.name,
        description: demo.description,
        url: demo.url,
        technologies: demo.tags,
      })),
    ),
    generateBreadcrumbStructuredData([
      { name: 'Home', url: 'https://niccolofanton.dev' },
      { name: 'Demos', url: 'https://niccolofanton.dev/demos' },
    ]),
  ]

  return (
    <PageAnimation>
      <NextSeo {...seoData} />
      <SEOHead structuredData={structuredData} />
      <SimpleLayout
        title="Every WebGL demo, in one place."
        intro="Each of these is a small, self-contained study of one rendering technique, running live in the browser. They are also collected on the demo hub at demos.niccolofanton.dev."
      >
        <p className="mb-12 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
          Browse the same collection on{' '}
          <a
            className="font-medium text-zinc-800 underline decoration-zinc-300 underline-offset-4 transition hover:text-blue-500 dark:text-zinc-200 dark:decoration-zinc-600"
            href="https://demos.niccolofanton.dev"
          >
            the WebGL demo hub
          </a>
          , or read the write-ups in{' '}
          <Link
            className="font-medium text-zinc-800 underline decoration-zinc-300 underline-offset-4 transition hover:text-blue-500 dark:text-zinc-200 dark:decoration-zinc-600"
            href="/articles"
          >
            the articles section
          </Link>
          .
        </p>
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {demos.map((demo) => (
            <ProjectCard as="li" key={demo.url}>
              <h2 className="font-mono text-base font-semibold text-zinc-800 dark:text-zinc-100">
                <Card.Link href={demo.url} target="_blank">
                  {demo.name}
                </Card.Link>
              </h2>
              <Card.Description>{demo.description}</Card.Description>
              <p className="relative z-10 mt-6 flex flex-wrap gap-2 text-xs font-medium text-zinc-400 dark:text-zinc-500">
                {demo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-100 px-2 py-1 dark:bg-zinc-800"
                  >
                    {tag}
                  </span>
                ))}
              </p>
            </ProjectCard>
          ))}
        </ul>
      </SimpleLayout>
    </PageAnimation>
  )
}
