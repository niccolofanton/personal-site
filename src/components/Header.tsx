import { useContext, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import clsx from 'clsx'
import { motion } from 'framer-motion'

import { Container } from '@/components/Container'
import avatarImage from '@/images/avatar.jpg'
import { anim, blur, getTime } from './PageAnimation'
import { AppContext } from './Providers'

function SunIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z" />
      <path
        d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061"
        fill="none"
      />
    </svg>
  )
}

function MoonIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function NavItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  let isActive = usePathname() === href

  return (
    <li>
      <Link
        href={href}
        scroll={false}
        className={clsx(
          'relative block px-3 py-2 transition duration-[850ms] ',
          isActive ? 'text-blue-500 dark:text-blue-600' : 'sm:hover:text-blue-500 dark:sm:hover:text-blue-400',
        )}
      >
        {children}
        <span className={
          clsx(
            `transition duration-[850ms] absolute inset-x-1 -bottom-px h-[1.5px] bg-gradient-to-r 
            from-blue-600/0 via-blue-600 to-blue-600/0 
            dark:from-blue-600/0 dark:via-blue-500 dark:to-blue-600/0`,
            isActive ? 'opacity-100' : 'opacity-0'
          )
        } />
      </Link>
    </li>
  )
}

function DesktopNavigation(props: React.ComponentPropsWithoutRef<'nav'>) {
  return (
    <nav {...props}>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        <NavItem href="/">Home</NavItem>
        <NavItem href="/projects">Projects</NavItem>
        <NavItem href="/articles">Articles</NavItem>
      </ul>
    </nav>
  )
}

function ThemeToggle() {
  let { resolvedTheme, setTheme } = useTheme()
  let otherTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
  let [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${otherTheme} theme` : 'Toggle theme'}
      className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:sm:hover:ring-white/20"
      onClick={() => setTheme(otherTheme)}
    >
      <SunIcon className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition sm:group-hover:fill-zinc-200 sm:group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-blue-50 [@media(prefers-color-scheme:dark)]:stroke-blue-500 [@media(prefers-color-scheme:dark)]:sm:group-hover:fill-blue-50 [@media(prefers-color-scheme:dark)]:sm:group-hover:stroke-blue-600" />
      <MoonIcon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:sm:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-blue-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-blue-500" />
    </button>
  )
}

function clamp(number: number, a: number, b: number) {
  let min = Math.min(a, b)
  let max = Math.max(a, b)
  return Math.min(Math.max(number, min), max)
}

function AvatarContainer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx(
        className,
        'h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10',
      )}
      {...props}
    />
  )
}

function Avatar({
  large = false,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href'> & {
  large?: boolean
}) {
  return (
    <Link
      href="/"
      aria-label="Home"
      className={clsx(className, 'pointer-events-auto')}
      {...props}
    >
      <Image
        src={avatarImage}
        alt=""
        sizes={large ? '4rem' : '2.25rem'}
        className={clsx(
          'rounded-full bg-zinc-100 object-cover dark:bg-zinc-800',
          large ? 'h-16 w-16' : 'h-9 w-9',
        )}
        priority
        unoptimized
      />
    </Link>
  )
}

export function Header() {
  let home = usePathname() === '/'
  let headerRef = useRef<React.ElementRef<'div'>>(null)


  const { playHomeAnimation, setPlayHomeAnimation } = useContext(AppContext);

  useEffect(() => {
    if (!home) {
      setPlayHomeAnimation(false)
    }
  }, [])

  return (
    <>
      <motion.div {...anim(blur(getTime(0), home && playHomeAnimation))} >
        <header
          className="pointer-events-none relative z-50 flex flex-none flex-col md:mb-20"
          style={{ height: 'var(--header-height)' }}
        >

          <>
            <div
              className="top-[var(--avatar-top,theme(spacing.3))] w-full"
              style={{
                position:
                  'var(--header-inner-position)' as React.CSSProperties['position'],
              }}
            >
              <div
                className="top-[var(--avatar-top,theme(spacing.3))] w-full"
                style={{
                  position:
                    'var(--header-inner-position)' as React.CSSProperties['position'],
                }}
              >
              </div>
            </div>
          </>

          <div
            ref={headerRef}
            className="top-0 z-10 h-16 pt-6"
            style={{
              position:
                'var(--header-position)' as React.CSSProperties['position'],
            }}
          >
            <Container
              className="top-[var(--header-top,theme(spacing.6))] w-full"
              style={{
                position:
                  'var(--header-inner-position)' as React.CSSProperties['position'],
              }}
            >
              <div className="relative flex gap-4">
                <div className="flex flex-1">
                  <AvatarContainer>
                    <Avatar />
                  </AvatarContainer>
                </div>
                <div className="flex flex-1 justify-start md:justify-center">
                  {/* <MobileNavigation className="pointer-events-auto md:hidden" /> */}
                  <DesktopNavigation className="pointer-events-auto" />
                </div>
                <div className="flex justify-end md:flex-1">
                  <div className="pointer-events-auto">
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </header>
        <div
          className="flex-none"
          style={{ height: 'var(--content-offset)' }}
        />
      </motion.div>

    </>
  )
}
