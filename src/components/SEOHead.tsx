import Head from 'next/head'

interface SEOHeadProps {
  structuredData?: object | object[]
  children?: React.ReactNode
}

export function SEOHead({ structuredData, children }: SEOHeadProps) {
  return (
    <Head>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(Array.isArray(structuredData) ? structuredData : [structuredData])
          }}
        />
      )}
      {children}
    </Head>
  )
} 