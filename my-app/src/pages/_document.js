import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <title>Makai</title>
      </Head>
      <body className="min-h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document;
