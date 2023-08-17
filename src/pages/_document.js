import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="description"
              content="Kasizzle is a DJ and music producer based in Stockholm, Sweden, with performances at Sturecompagniet, Hyde, Café Opera, and more."></meta>
      </Head>
      <body>
      <Main />
      <NextScript />
      </body>
    </Html>
  );
}
