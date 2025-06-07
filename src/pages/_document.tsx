import { Html, Head, Main, NextScript } from "next/document";
import Script from 'next/script';

export default function Document() {
  
  return (
    <Html lang="en" className={` h-auto antialiased`} suppressHydrationWarning>
      <Head>
        <link rel="icon" href='/favicon.ico' sizes="any" />
        <link rel="apple-touch-icon" href="/images/preview.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="canonical" href="https://niccolofanton.dev" />

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

      </Head>
      <body className="h-full bg-zinc-200 dark:bg-[#121212]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
