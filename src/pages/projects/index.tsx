import Image from 'next/image';

import { Card } from '@/components/Card';
import { SimpleLayout } from '@/components/SimpleLayout';

import { NextSeo } from 'next-seo';
import { generateMetadata } from '@/lib/metadata';
import { generatePortfolioStructuredData, generateBreadcrumbStructuredData } from '@/lib/structured-data';
import { SEOHead } from '@/components/SEOHead';
import logoOrtify from '@/images/logos/ortify.jpeg';
import logoEndor from '@/images/logos/endor.jpeg';
import logoSingularity from '@/images/logos/singularity.png';
import logoNDM from '@/images/logos/ndm.jpeg';
import logoDuna from '@/images/logos/duna.jpeg';
import logoCar from '@/images/logos/car.jpeg';
import logoDithering from '@/images/logos/dithering.png';
import logoImageTrail from '@/images/logos/image-trail.png';

import { PageAnimation } from '@/components/PageAnimation';
import { ProjectCard } from '@/components/ProjectCard';

const projects = [
  {
    name: 'Image-trail',
    description:
      'Image trail shader for three.js pmndrs/postprocessing',
    link: { href: 'https://trail.niccolofanton.dev/', label: 'Image-trail' },
    logo: logoImageTrail,
  },
  {
    name: 'Dithering Shader',
    description:
      'Dithering shader for three.js pmndrs/postprocessing',
    link: { href: 'https://dithering.niccolofanton.dev/', label: 'Dithering' },
    logo: logoDithering,
  },
  {
    name: 'Singularity',
    description:
      'Experimentation with three.js + rapier on mesh optimization',
    link: { href: 'https://singularity.niccolofanton.dev/', label: 'Singularity' },
    logo: logoSingularity,
  },
  {
    name: 'ENDOR',
    description:
      'A creative studio that designs and develops digital products for the web.',
    link: { href: 'https://endor.studio/', label: 'Endor Studio' },
    logo: logoEndor,
  },
  {
    name: 'DUNA',
    description:
      'A 3D web-based platform for hosting virutal events and conferences.',
    link: { href: 'https://duna.niccolofanton.dev', label: 'Duna Experience' },
    logo: logoDuna,
  },
  {
    name: 'Configurator',
    description:
      'A 3D web-based configurator for customizing your dream car.',
    link: { href: 'https://car.niccolofanton.dev', label: 'Showcase' },
    logo: logoCar,
  },
  {
    name: 'NDM Studio',
    description:
      'A token gated community for fashion photographers, by Emanuele Ferrari.',
    link: { href: 'https://www.instagram.com/ndmstudio_official', label: 'Instagram Page' },
    logo: logoNDM,
  },
  {
    name: 'Ortify',
    description:
      'NASA Space Apps Challenge "GLOBAL NOMINEE": An app to certify your home-grown vegetables',
    link: { href: 'https://2017.spaceappschallenge.org/challenges/earth-and-us/whats-dinner/teams/foodengineers', label: 'Ortify Article' },
    logo: logoOrtify,
  },
]

function LinkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const metadata = {
  title: 'Creative Projects & Portfolio - Niccoló Fanton',
  description: 'Showcase of my projects including 3D configurators, interactive shaders, virtual experiences, and cutting-edge digital solutions that push creative boundaries.',
  keywords: ['creative portfolio', 'three.js projects', 'webgl applications', '3d web configurators', 'interactive experiences', 'projects', 'digital innovation', 'web design portfolio', 'creative coding showcase'],
}

export default function Projects() {
  const seoData = generateMetadata({
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    type: 'website',
    canonical: 'https://niccolofanton.dev/projects',
  })

  const structuredProjects = projects.map(project => ({
    name: project.name,
    description: project.description,
    url: project.link.href,
    image: project.logo.src,
    technologies: ['Three.js', 'React', 'WebGL', 'JavaScript'],
  }))

  const structuredData = [
    generatePortfolioStructuredData(structuredProjects),
    generateBreadcrumbStructuredData([
      { name: 'Home', url: 'https://niccolofanton.dev' },
      { name: 'Projects', url: 'https://niccolofanton.dev/projects' }
    ])
  ]

  return (
    <PageAnimation>
      <NextSeo {...seoData} />
      <SEOHead structuredData={structuredData} />
      <SimpleLayout
        title="Things I've made trying to put my dent in the universe."
        intro="I've worked on tons of little projects over the years but these are the ones that I'm most proud of!"
      >
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <ProjectCard as="li" key={project.name}>
              <div className="relative overflow-hidden z-10 hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                <Image
                  src={project.logo}
                  alt=""
                  className="h-12 w-12"
                  unoptimized
                />
              </div>
              <h2 className="mt-6 text-base font-mono font-semibold text-zinc-800 dark:text-zinc-100">
                <Card.Link href={project.link.href} target='_blank'>{project.name}</Card.Link>
              </h2>
              <Card.Description>{project.description}</Card.Description>
              <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition sm:group-hover:text-blue-500 dark:text-zinc-200">
                <LinkIcon className="h-6 w-6 flex-none" />
                <span className="ml-2">{project.link.label}</span>
              </p>
            </ProjectCard>
          ))}
        </ul>
      </SimpleLayout>
    </PageAnimation>
  )
}
