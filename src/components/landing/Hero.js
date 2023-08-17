import styles from './Hero.module.css';
import { useEffect, useState } from 'react';

export default function Hero() {
  let [mobileView, setMobileView] = useState(false);
  const mobileMaxViewportWidth = 1023;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= mobileMaxViewportWidth && !mobileView) {
        setMobileView(true);
      } else if (window.innerWidth > mobileMaxViewportWidth && mobileView) {
        setMobileView(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileView]);

  return (
    <section>
      <div className={'relative w-full max-h-[100vh] overflow-hidden'} id={'hero'}>
        <video playsInline autoPlay muted loop className={styles.video} key={mobileView ? 1 : 2}
               poster={mobileView ? '/hero/hero-poster-mobile.jpg' : '/hero/hero-poster.jpg'}>
          {mobileView ? (
            <source src={'/hero/Eriks Vertical DJ Video.mp4'} type={'video/mp4'} />
          ) : (
            <source src={'/hero/Kasizzle Landscape Video.mp4'} type={'video/mp4'} />
          )}
        </video>


        <div className={'absolute inset-0 flex flex-row items-center'}>
          <div className={'flex w-full flex-col items-center ml-1 sm:m-0'}>
            <img src={'/logo-dark.png'} alt={'Kasizzle Logo'}
                 className={'w-[45%] h-[45%] sm:w-[35%] sm:w-[35%] md:w-[25%] md:h-[25%] lg:w-[20%] lg:h-[20%]'} />
            <h3 className={'text-5xl lg:text-6xl font-black mt-2'}>KASIZZLE</h3>
          </div>
        </div>
      </div>
    </section>
  );
}