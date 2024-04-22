import { Html, Head, Main, NextScript } from "next/document";
import Script from 'next/script';

export default function Document() {
  
  return (
    <Html lang="en" className={` h-auto antialiased`} suppressHydrationWarning>
      <Head>

        <Script
          strategy='lazyOnload'
          src={`https://www.googletagmanager.com/gtag/js?id=G-KHV4Q1BQHW`}
        />

        <Script id='' strategy='lazyOnload'>
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-KHV4Q1BQHW', {
              page_path: window.location.pathname,
              });
          `}
        </Script>

        <link rel="icon" href='/favicon.ico' sizes="any" />

      </Head>
      <body className="h-full bg-zinc-200 dark:bg-[#121212]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
