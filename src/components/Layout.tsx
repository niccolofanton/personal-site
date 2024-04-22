import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { AnimatePresence } from 'framer-motion'
import { ReactLenis } from "@studio-freight/react-lenis";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { LegacyRef, useRef } from 'react';
import { ReactLoadableManifest } from 'next/dist/server/load-components';


export function Layout({ children }: { children: React.ReactNode }) {

  let lenisRef = useRef() as LegacyRef<ReactLoadableManifest>;

  return (

    <ReactLenis ref={lenisRef} root options={{ lerp: 0.2 }}>
      <div className="relative flex w-full flex-col" >
        <AnimatePresence mode='wait'>
          <Header />

          <main className={`${GeistSans.variable} ${GeistMono.variable} flex-auto`}>
            <AnimatePresence mode='wait' onExitComplete={() => {
              if (!lenisRef) return;
              const lenis = (lenisRef as any).current.lenis;
              lenis.scrollTo(0, { duration: .6 });
            }}>
              {children}
            </AnimatePresence>
          </main>
          <Footer lenisRef={lenisRef} />
        </AnimatePresence>

      </div>
    </ReactLenis>
  )
}
