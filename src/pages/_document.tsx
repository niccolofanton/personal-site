import { Html, Head, Main, NextScript } from "next/document";
import { GoogleAnalytics } from '@next/third-parties/google'


export default function Document() {
  return (
    <Html lang="en" className={` h-auto antialiased`} suppressHydrationWarning>
      <Head>
        <GoogleAnalytics gaId="G-KHV4Q1BQHW" />
      </Head>
      <body className="h-full bg-zinc-200 dark:bg-[#121212]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
