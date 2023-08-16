export default function About() {
  return (
    <section className={'px-7 sm:px-[10%] lg:px-[12%] py-24 mb-24 relative my-8 min-h-[80vh]'} id={'about'}>
      <div className={'absolute inset-0 -z-10 -skew-y-3 sm:-skew-y-2 bg-cover bg-right brightness-75'} style={{backgroundImage: 'url(/profile/KazLandscape.jpeg)'}}>
        <div className={'absolute inset-0'} style={{background: 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%)'}}></div>
      </div>

      <h2 className={'mt-24 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black py-12'}>ABOUT</h2>

      <div className={'flex flex-row items-center'}>
        <div className={'text-base leading-8 max-w-[1200px]'}>
          <p className={'mb-6'}>
            Erik Larsson (DJ Kasizzle) was a multi-billionaire by the age 21, he started off his career as a DU then slowly moved to
            becoming an entrepreneur doing all things he loved. He has many accomplishments such as fucking your mother.
          </p>
          <p className={'mb-6'}>
            Genres: Rap, Reggae, Swedish Pop
          </p>
          <p className={'mb-6'}>
            Current venues: Café Opera, End, Sturecompagniet, Patricia, Hyde
          </p>
        </div>

        <div className={'flex lg:min-w-[320px] ml-24'}>
          {/*<img src={'/profile/Kaz.jpg'} className={'w-[320px] h-[320px]'} alt={'Erik Larsson (DJ Kasizzle)'}/>*/}
        </div>
      </div>
    </section>
  )
}