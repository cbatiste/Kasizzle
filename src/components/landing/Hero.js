import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={'mt-[55vw]'}>
      <div className={'absolute top-0 left-0 right-0 w-full max-h-[55vw] overflow-hidden -z-20'}>
        <video autoPlay muted loop className={styles.video}>
          <source src={'/hero/Kasizzle Landscape Video.mov'} type={'video/mp4'} />
        </video>
      </div>

      <div className={'absolute top-[14vw] -z-10 left-0 right-0'}>
        <div className={'text-center'}>
          <img src={'/logo-dark.png'} alt={'Kasizzle Logo'} className={'m-auto w-[20%] h-[20%]'} />
          <h3 className={'text-4xl md:text-5xl lg:text-6xl font-black mt-2 pr-1'}>KASIZZLE</h3>
        </div>
      </div>
    </section>
  )
}