import { Html, Head, Main, NextScript } from "next/document";


export default function Document() {
  return (
    <Html lang="en" className={` h-auto antialiased`} suppressHydrationWarning>
      <Head />
      <body className="h-full bg-zinc-200 dark:bg-[#121212]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
