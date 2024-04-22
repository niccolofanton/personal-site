import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { motion } from 'framer-motion';

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
  BehanceIcon
} from '@/components/SocialIcons'
import logoAzzurroDigitale from '@/images/logos/azzurrodigitale.jpeg'
import logoAWMS from '@/images/logos/awms.jpeg'
import logoEndor from '@/images/logos/endor.jpeg'
import logoMe from '@/images/logos/me.jpeg'
// import image1 from '@/images/photos/image-1.jpg'
// import image2 from '@/images/photos/image-2.jpg'
// import image3 from '@/images/photos/image-3.jpg'
// import image4 from '@/images/photos/image-4.jpg'
// import image5 from '@/images/photos/image-5.jpg'
// import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import { GetStaticProps, InferGetStaticPropsType, Metadata } from 'next'
import { PageAnimation, anim, blur, getTime } from '@/components/PageAnimation'
import { getAllArticles, ArticleWithSlug } from '@/lib/articles'
import { RandomText } from '@/components/RandomText'
import { RandomLoopingText } from '@/components/RandomLopingText'
import { useContext, useEffect } from 'react';
import { AppContext } from '@/components/Providers';
import { Scene } from '@/components/scene';

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function BriefcaseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function ArrowDownIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Article({ article, playHomeAnimation }: { article: ArticleWithSlug, playHomeAnimation: boolean }) {
  return (

    <article className="relative isolate flex flex-row gap-8 items-center ">

      <div className="relative hidden md:block aspect-square w-36 h-36 ">
        <img
          src={article.image.src}
          alt=""
          className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div>
        <div className="flex items-center gap-x-4 text-xs">
          <time dateTime={article.date} className="text-zinc-400 dark:text-zinc-400">
            {formatDate(article.date)}
          </time>
          <a
            // href={post.category.href}
            className="relative scale-75 z-10 rounded-full bg-gray-50 px-2 py-[.1rem] font-medium text-gray-600 hover:bg-gray-100"
          >
            {/* {post.category.title} */}
            demo
          </a>
        </div>
        <div className="group relative max-w-xl">
          <h3 className="mt-3 text-lg font-semibold leading-6 tracking-tight text-zinc-800 dark:text-zinc-100">
            <a href={`/articles/${article.slug}`}>
              <span className="absolute inset-0" />
              {/* {article.title} */}
              <RandomText fadeIn={playHomeAnimation} speed={20} text={article.title} />
            </a>
          </h3>
          <p className="mt-5 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{article.description}</p>
        </div>
        {/* <div className="mt-6 flex border-t border-gray-900/5 pt-6">
          <div className="relative flex items-center gap-x-4">
            <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
            <div className="text-sm leading-6">
              <p className="font-semibold text-gray-900">
                <a href={post.author.href}>
                  <span className="absolute inset-0" />
                  {post.author.name}
                </a>
              </p>
              <p className="text-gray-600">{post.author.role}</p>
            </div>
          </div>
        </div> */}
      </div>
    </article>

    // <Card as="article">
    //   <Card.Title href={`/articles/${article.slug}`} >
    //     <RandomText fadeIn={playHomeAnimation} text={article.title} />
    //   </Card.Title>
    //   {/* <Card.Eyebrow as="time" dateTime={article.date} decorate>
    //     {formatDate(article.date)}
    //   </Card.Eyebrow> */}
    //   <Card.Description>{article.description}</Card.Description>
    //   <Card.Cta>Read article</Card.Cta>
    // </Card>
  )
}

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition sm:group-hover:fill-zinc-600 dark:fill-zinc-400 dark:sm:group-hover:fill-zinc-300" />
    </Link>
  )
}

function Newsletter() {
  return (
    <form
      action="/thank-you"
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3 font-mono">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div className="mt-6 flex">
        <input
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/10"
        />
        <Button type="submit" className="ml-4 flex-none">
          Join
        </Button>
      </div>
    </form>
  )
}

interface Role {
  company: string
  title: string
  logo: ImageProps['src']
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
}

function Role({ role }: { role: Role }) {
  let startLabel =
    typeof role.start === 'string' ? role.start : role.start.label
  let startDate =
    typeof role.start === 'string' ? role.start : role.start.dateTime

  let endLabel = typeof role.end === 'string' ? role.end : role.end.label
  let endDate = typeof role.end === 'string' ? role.end : role.end.dateTime

  return (
    <li className="flex gap-4">
      <div className="relative overflow-hidden mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image src={role.logo} alt="" className="h-10 w-10" unoptimized />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full font-mono flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {role.company}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {role.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
          aria-label={`${startLabel} until ${endLabel}`}
        >
          <time dateTime={startDate}>{startLabel}</time>{' '}
          <span aria-hidden="true">—</span>{' '}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
      </dl>
    </li>
  )
}

function Resume() {
  let resume: Array<Role> = [
    {
      company: 'ENDOR',
      title: 'CTO & Co-Founder',
      logo: logoEndor,
      start: '2022',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: 'Freelance',
      title: 'Full Stack Developer',
      logo: logoMe,
      start: '2023',
      end: '2022',
    },
    {
      company: 'AWSM',
      title: 'Senior Frontend Developer',
      logo: logoAWMS,
      start: '2021',
      end: '2022',
    },
    {
      company: 'AzzurroDigitale',
      title: 'Full Stack Developer',
      logo: logoAzzurroDigitale,
      start: '2017',
      end: '2021',
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3 font-mono">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
      <Button href="https://www.linkedin.com/in/niccolofanton/details/experience/" target='_blank' variant="secondary" className="group mt-6 w-full">
        More details
        <ArrowDownIcon className="h-4 w-4 -rotate-[135deg] stroke-zinc-400 transition group-active:stroke-zinc-600 dark:sm:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}

// function Photos() {
//   let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

//   return (
//     <div className="mt-16 sm:mt-20">
//       <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
//         {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
//           <div
//             key={image.src}
//             className={clsx(
//               'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
//               rotations[imageIndex % rotations.length],
//             )}
//           >
//             <Image
//               src={image}
//               alt=""
//               sizes="(min-width: 640px) 18rem, 11rem"
//               className="absolute inset-0 h-full w-full object-cover"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

export const metadata: Metadata = {
  title: 'Home - Niccoló Fanton',
  description: 'Niccoló Fanton - I find meaning in work that matters.',
}

export const getStaticProps = (async (context: any) => {
  return { props: { data: await getAllArticles() } }
}) satisfies GetStaticProps<{
  data: ArticleWithSlug[]
}>

export default function HomePage({ data }: InferGetStaticPropsType<typeof getStaticProps>) {

  let articles = data.slice(0, 4)

  const { playHomeAnimation, setPlayHomeAnimation } = useContext(AppContext);

  useEffect(() => {
    // disable animation after first visit
    return () => setPlayHomeAnimation(false)
  }, [])

  return (

    <PageAnimation>
      <Container className="mt-16">
        <div className="min-w-full flex flex-col-reverse gap-10 lg:gap-0 lg:flex-row lg:items-center lg:justify-between">

          <div className='max-w-2xl'>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
              <RandomLoopingText
                delay={800}
                fadeIn={!!playHomeAnimation}
                text={`I'm Nick. I find meaning in work that "matters"`}
                loop={{
                  delay: 1000,
                  keywork: 'matters',
                  words: ['inspires', 'amazes', 'pays', 'moves', 'matters'],
                }}
              />
            </h1>
            <motion.p {...anim(blur(getTime(2), playHomeAnimation))} className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
              My name is Niccolò Fanton, and I&apos;m a developer based Italy.
              I have a profound love for design and I consider my work as an extension of myself.
              I&apos;m an explorer of hidden meanings, I chase life with an insatiable thirst for
              understanding. <br /><br />
              Passion fuels every action, leading every step with fervor.
            </motion.p>
            <motion.div  {...anim(blur(getTime(3), playHomeAnimation))} className="mt-6 flex gap-6">
              <SocialLink href="https://twitter.com/niccolofanton" target='_blank' aria-label="Follow on X" icon={XIcon} />
              <SocialLink
                href="https://www.instagram.com/niccolofanton"
                target='_blank'
                aria-label="Follow on Instagram"
                icon={InstagramIcon}
              />
              <SocialLink
                href="https://www.behance.net/fantonniccolo"
                target='_blank'
                aria-label="Follow on Behance"
                icon={BehanceIcon}
              />
              <SocialLink
                href="https://www.linkedin.com/in/niccolofanton"
                target='_blank'
                aria-label="Follow on LinkedIn"
                icon={LinkedInIcon}
              />
              <SocialLink
                href="https://github.com/niccolofanton"
                target='_blank'
                aria-label="Follow on GitHub"
                icon={GitHubIcon}
              />

              <SocialLink
                href="mailto:niccolofanton1997@gmail.com"
                icon={MailIcon}
              >
              </SocialLink>
            </motion.div>
          </div>

          <motion.div  {...anim(blur(.2, playHomeAnimation))}>
            <Scene className='h-64' />
          </motion.div>

        </div>


      </Container>
      {/* <Photos /> */}
      <Container className="mt-36 md:mt-36">

        <div className={`${articles.length > 0 ? `lg:grid-cols-2` : ''} mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none justify-items-center `}>

          {articles.length > 0 && (
            <motion.div {...anim(blur(getTime(4), playHomeAnimation))} className="flex flex-col gap-16">
              <h4 className="mb-[-30px] text-3xl font-bold tracking-tight text-zinc-800 sm:text-3xl dark:text-zinc-100">
                <RandomText fadeIn={playHomeAnimation} text='Latest articles'></RandomText>
              </h4>

              {articles.map((article) => (
                <Article key={article.slug} article={article} playHomeAnimation={!!playHomeAnimation} />
              ))}
            </motion.div>
          )}

          <div className={`space-y-10  max-w-xl ${articles.length > 0 ? 'lg:pl-16 xl:pl-24 mt-10' : ''}`}>
            <motion.div {...anim(blur(getTime(5), playHomeAnimation))}>
              <Resume />
            </motion.div>
            <motion.div {...anim(blur(getTime(6), playHomeAnimation))}>
              {/* <Newsletter /> */}
            </motion.div>
          </div>
        </div>

      </Container>
    </PageAnimation>

  )
}
