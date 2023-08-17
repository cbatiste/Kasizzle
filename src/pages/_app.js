import 'styles/globals.css';
import Head from 'next/head';
import { Space_Mono } from 'next/font/google';
import localFont from 'next/font/local';

const Space_MonoVariable = Space_Mono({subsets: ['latin'], weight: ['400', '700']});

const FuturaPTBold = localFont({
  src: '../assets/FuturaPTBold.otf',
  display: 'swap'
});

const FuturaPTLight = localFont({
  src: '../assets/FuturaPTBook.otf',
  display: 'swap'
});


export default function App({Component, pageProps}) {
  return (
    <>
      <Head>
        <title>KASIZZLE.SE</title>
      </Head>
      <style jsx global>{`
        html {
          font-family: ${Space_MonoVariable.style.fontFamily};
          font-weight: 300;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: ${FuturaPTBold.style.fontFamily};
          letter-spacing: 0.6px;
        }

        @media (max-width: 639px) {
          h1, h2, h3, h4, h5, h6 {
            letter-spacing: -0.4px;
          }
        }

        .header-heavy {
          font-family: ${FuturaPTBold.style.fontFamily};
        }

        .header-light {
          font-family: ${FuturaPTLight.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
