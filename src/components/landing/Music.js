import { useContext, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import AudioPlayer from '../AudioPlayer';
import { Spotify } from 'react-spotify-embed';
import { DataContext } from 'pages';
import { PiSwap, PiVinylRecord } from 'react-icons/pi';
import { RiSoundModuleLine } from 'react-icons/ri';
import { FaTimes } from 'react-icons/fa';
import useOnScreen from '../../utility/useOnScreen';

function Card(props) {
  return (
    <div className={'m-2 md:m-6 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer'}
         onClick={() => {
           if (props.onClick) props.onClick();
         }}>
      <img src={props.image.url} alt={props.title} className={'w-full'} />
    </div>
  );
}

function MusicOverlay(props) {
  let music = props.music;

  useEffect(() => {
    document.body.classList.add('overflow-hidden', 'md:overflow-auto');
    return () => {
      document.body.classList.remove('overflow-hidden', 'md:overflow-auto');
    };
  }, []);

  const handleClose = () => {
    if (props.onClose) props.onClose();
  };

  return (
    <div className={'fixed flex pb-8 inset-0 z-40'}>
      <div className={'absolute inset-0 bg-black/75 cursor-pointer bg-black/75'} onClick={handleClose}></div>

      <div className={`absolute inset-0 md:relative md:w-[80%] md:max-w-[800px] md:max-h-[80vh] overflow-y-auto m-auto
                       px-8 py-12 md:p-12 bg-neutral-900 md:border-2 border-neutral-800 md:rounded-lg z-50`}>
        <div className={'flex flex-row'}>
          <div className={'flex flex-col grow'}>
            <h2 className={'text-4xl md:text-5xl mb-2'}>{music.title}</h2>
            <p className={'text-2xl md:text-3xl header-light'}>{music.artist}</p>
          </div>
          <div className={'flex flex-col shrink'}>
            <div
              className={'rounded-full p-1 border-2 border-transparent hover:border-white transition ease-in duration-100 cursor-pointer'}
              onClick={handleClose}>
              <FaTimes className={'text-4xl'} title={'Close music info'} />
            </div>
          </div>
        </div>

        {
          music.description &&
          <div className={'mt-8 text-base'}>
            {music.description}
          </div>
        }

        {
          music.trackListing?.length &&
          <div className={'mt-8'}>
            <h4 className={'text-2xl mb-2'}>Track listing:</h4>
            <ul className={'text-base ml-4'}>
              {
                music.trackListing.map((track, index) => (
                  <li key={index}>{index + 1}. {track}</li>
                ))
              }
            </ul>
          </div>
        }

        <div className={'flex flex-col lg:flex-row mt-12 text-base'}>
          <div className={'flex-1'}>
            {music.writtenBy && <p className={'mb-2'}>Written by: {music.writtenBy}</p>}
            {music.performedBy && <p className={'mb-2'}>Performed by: {music.performedBy}</p>}
            {music.producedBy && <p className={'mb-2'}>Produced by: {music.producedBy}</p>}
          </div>
          <div className={'flex-1'}>
            {music.source && <p className={'mb-2'}>Source: {music.source}</p>}
            {music.artwork && <p className={'mb-2'}>Artwork: {music.artwork}</p>}
          </div>
        </div>

        {
          music.spotifyURL &&
          <div className={'mt-12'}>
            <Spotify wide link={music.spotifyURL} />
          </div>
        }
      </div>
    </div>
  );
}

function MixOverlay(props) {
  let mix = props.mix;

  useEffect(() => {
    document.body.classList.add('overflow-hidden', 'md:overflow-auto');
    return () => {
      document.body.classList.remove('overflow-hidden', 'md:overflow-auto');
    };
  }, []);

  const handleClose = () => {
    if (props.onClose) props.onClose();
  };

  return (
    <div className={'fixed flex pb-8 inset-0 z-40'}>
      <div className={'absolute inset-0 bg-black/75 cursor-pointer bg-black/75'} onClick={handleClose}></div>

      <div className={`absolute inset-0 md:relative md:w-[80%] md:max-w-[800px] md:max-h-[80vh] overflow-y-auto m-auto
                       px-8 py-12 md:p-12 bg-neutral-900 md:border-2 border-neutral-800 md:rounded-lg z-50`}>
        <div className={'flex flex-row'}>
          <div className={'flex flex-col grow'}>
            <h2 className={'text-4xl md:text-5xl mb-2'}>{mix.title}</h2>
            <p className={'text-2xl md:text-3xl header-light'}>{mix.artist}</p>
          </div>
          <div className={'flex flex-col shrink'}>
            <div
              className={'rounded-full p-1 border-2 border-transparent hover:border-white transition ease-in duration-100 cursor-pointer'}
              onClick={handleClose}>
              <FaTimes className={'text-4xl'} title={'Close music info'} />
            </div>
          </div>
        </div>

        {
          mix.description &&
          <div className={'mt-8 text-base'}>
            {mix.description}
          </div>
        }

        <div className={'mt-2'}>
          <AudioPlayer assetURL={mix.audioFile} />
        </div>
      </div>
    </div>
  );
}

export default function Music() {
  const music = useContext(DataContext).music;
  const mixes = useContext(DataContext).mixes;

  let [ activeCard, setActiveCard ] = useState(null);
  let [ musicType, setMusicType ] = useState(null);

  const musicAnim = { visible: { transition: { staggerChildren: 0.2 } } };
  const musicItemAnim = {
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 24 } },
    hidden: { opacity: 0, y: 20 }
  };

  let containerRef = useRef(null);
  let containerVisible = useOnScreen(containerRef);

  const cardTypes = {
    music: <MusicOverlay music={activeCard} onClose={() => setActiveCard(null)} />,
    mix: <MixOverlay mix={activeCard} onClose={() => setActiveCard(null)} />
  };

  return (
    <section className={'px-7 sm:px-[10%] lg:px-[12%] my-8'} id={'music'}>
      <h2 className={'mt-24 text-5xl md:text-6xl lg:text-7xl font-black py-12'}>MUSIC</h2>

      {
        activeCard && cardTypes[musicType]
      }

      <div className={'mb-12'}>
        <h3 className={'flex flex-row items-center text-3xl mb-6'}>
          <PiVinylRecord />
          <span className={'px-4'}>Singles/Albums</span>
        </h3>

        <motion.div className={'grid grid-cols-2 lg:grid-cols-3'}
                    initial="hidden"
                    animate={containerVisible ? 'visible' : ''}
                    whileInView="visible"
                    viewport={{ once: true, margin: '-200px' }}
                    variants={musicAnim}
                    ref={containerRef}>
          {
            music?.length ? music.map((card, index) => (
              <motion.div variants={musicItemAnim} key={index}>
                <Card image={card.photo} alt={card.title} onClick={() => {
                  setActiveCard(card);
                  setMusicType('music');
                }} variants={musicItemAnim} />
              </motion.div>
            )) : ''
          }
        </motion.div>
      </div>

      <div className={'mb-12'}>
        <h3 className={'flex flex-row items-center text-3xl mb-6'}>
          <PiSwap />
          <span className={'px-4'}>DJ Mixes</span>
        </h3>

        <motion.div className={'grid grid-cols-2 lg:grid-cols-3'}
                    initial="hidden"
                    animate={containerVisible ? 'visible' : ''}
                    whileInView="visible"
                    viewport={{ once: true, margin: '-200px' }}
                    variants={musicAnim}
                    ref={containerRef}>
          {
            mixes?.length ? mixes.map((card, index) => (
              <motion.div variants={musicItemAnim} key={index}>
                <Card image={card.photo} alt={card.title} onClick={() => {
                  setActiveCard(card);
                  setMusicType('mix');
                }} variants={musicItemAnim} />
              </motion.div>
            )) : ''
          }
        </motion.div>
      </div>

      <div className={'mb-12'}>
        <h3 className={'flex flex-row items-center text-3xl mb-6'}>
          <RiSoundModuleLine />
          <span className={'px-4'}>Productions</span>
        </h3>

        <div className={'grid grid-cols-3'}>
          {/*{*/}
          {/*  productions?.length ? productions.map((card, index) => (*/}
          {/*    <Card image={card.photo} alt={card.title} onClick={() => setActiveCard(card)} key={index} />*/}
          {/*  )) : ''*/}
          {/*}*/}
        </div>
      </div>
    </section>
  );
}