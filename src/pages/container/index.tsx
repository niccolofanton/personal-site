
import { ContainerScene } from '@/components/custom-scene';
import { PageAnimation } from '@/components/PageAnimation'
import { NextSeo } from 'next-seo';

export const metadata = {
  title: 'Projects - Niccoló Fanton',
  description: 'Things I’ve made trying to put my dent in the universe.',
}

export default function Projects() {
  return (
    <PageAnimation>

      <NextSeo
        title={metadata.title}
        description={metadata.description}
      />

      {/* 
      
      <SimpleLayout
        title="Things I’ve made trying to put my dent in the universe."
        intro="I’ve worked on tons of little projects over the years but these are the ones that I’m most proud of!"
        >
      </SimpleLayout>
      
      */}

      <ContainerScene className='h-[900px]'></ContainerScene>

    </PageAnimation>
  )
}