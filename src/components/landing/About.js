import { motion } from 'framer-motion';

export default function About() {
  const aboutAnim = { visible: { transition: { staggerChildren: 0.3 } } };
  const aboutItemAnim = {
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 150, damping: 24 } },
    hidden: { opacity: 0, x: -20 }
  };

  return (
    <section
      className={'px-7 sm:px-[10%] lg:px-[12%] py-24 mt-24 lg:mt-0 mb-12 lg:mb-24 relative my-8 min-h-[80vh]'}
      id={'about'}>
      <div
        className={'absolute inset-0 -z-10 -skew-y-3 sm:-skew-y-2 bg-cover bg-right brightness-[0.25] lg:brightness-100'}
        style={{ backgroundImage: 'url(/profile/KazLandscape.jpeg)' }}>
        <div className={'hidden lg:block absolute inset-0'}
             style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%)' }}></div>
      </div>

      <h2 className={'mt-12 text-5xl md:text-6xl lg:text-7xl font-black py-12'}>ABOUT</h2>

      <div className={'mb-16 flex flex-row items-center'}>
        <motion.div className={'text-base leading-8 lg:w-[60%] max-w-[1200px]'}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={aboutAnim}>
          <motion.p className={'mb-6'} variants={aboutItemAnim}>
            Erik Larsson (DJ Kasizzle) was a multi-billionaire by the age 21, he started off his career as a DJ then
            slowly moved to becoming an entrepreneur doing all things he loved. He has many accomplishments such as
            fucking your mother.
          </motion.p>
          <motion.p className={'mb-6'} variants={aboutItemAnim}>
            <b>Genres:</b> Rap, Reggae, Swedish Pop
          </motion.p>
          <motion.p className={'mb-6'} variants={aboutItemAnim}>
            <b>Current venues:</b> Café Opera, End, Sturecompagniet, Patricia, Hyde
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}