import Link from 'next/link'
import { motion } from 'framer-motion';
import { ContainerInner, ContainerOuter } from '@/components/Container'
import { anim, blur, getTime } from './PageAnimation';
import { useContext } from 'react';
import { AppContext } from './Providers';
import { usePathname } from 'next/navigation';

function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      scroll={false}
      className="transition sm:hover:text-blue-500 sm:dark:hover:text-blue-400"
    >
      {children}
    </Link>
  )
}

export function Footer({ lenisRef }: { lenisRef: any }) {

  let home = usePathname() === '/'
  const { playHomeAnimation } = useContext(AppContext);

  return (
    <motion.div {...anim(blur(getTime(0), home && playHomeAnimation))} >
      <footer className="mt-32 flex-none">
        <ContainerOuter>
          <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
            <ContainerInner>
              <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {/* <NavLink href="/">Home</NavLink>
                <NavLink href="/articles">Articles</NavLink>
                <NavLink href="/projects">Projects</NavLink> */}
                  <button onClick={() => {
                    lenisRef.current.lenis.scrollTo(0, { duration: .85 });
                  }}>
                    Back to top
                  </button>
                </div>
                <p className="text-sm text-zinc-400 dark:text-zinc-500">
                  &copy; {new Date().getFullYear()} Niccoló Fanton. All rights
                  reserved.
                </p>
              </div>
            </ContainerInner>
          </div>
        </ContainerOuter>
      </footer>
    </motion.div>

  )
}
