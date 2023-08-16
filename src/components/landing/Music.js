import {useState, useContext} from "react";
import {DataContext} from "pages";
import {PiSwap, PiVinylRecord} from "react-icons/pi";
import {RiSoundModuleLine} from "react-icons/ri";
import {FaTimes} from "react-icons/fa";

function Card(props) {
  return (
    <div className={'m-6 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer'} onClick={() => {
      if (props.onClick) props.onClick();
    }}>
      <img src={props.image.url} alt={props.title} className={'w-full'} />
    </div>
  );
}

function MusicOverlay(props) {
  let music = props.music;

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }

  console.log(music);

  return (
    <div className={'fixed inset-0 z-40'}>
      <div className={'absolute inset-0 bg-black/75 cursor-pointer bg-black/75'} onClick={handleClose}></div>

      <div className={'relative mt-[25vh] w-[80%] max-w-[800px] m-auto p-12 bg-neutral-900 rounded-lg z-50'}>
        <div className={'flex flex-row'}>
          <div className={'flex flex-col grow'}>
            <h2 className={'text-5xl mb-2'}>{music.title}</h2>
            <p className={'text-3xl header-light'}>{music.artist}</p>
          </div>
          <div className={'flex flex-col shrink'}>
            <div
              className={'rounded-full p-1 border-2 border-transparent hover:border-white transition ease-in duration-100 cursor-pointer'}
              onClick={handleClose}>
              <FaTimes className={'text-4xl'} title={'Close photo album'}/>
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
            { music.writtenBy && <p className={'mb-2'}>Written by: {music.writtenBy}</p> }
            { music.performedBy && <p className={'mb-2'}>Performed by: {music.performedBy}</p> }
            { music.producedBy && <p className={'mb-2'}>Produced by: {music.producedBy}</p> }
          </div>
          <div className={'flex-1'}>
            { music.source && <p className={'mb-2'}>Source: {music.source}</p> }
            { music.artwork && <p className={'mb-2'}>Artwork: {music.artwork}</p> }
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Music() {
  const musicData = useContext(DataContext).music;
  let music = musicData?.filter(music => music.type === 'Single/Album');
  let mixes = musicData?.filter(music => music.type === 'DJ Mix');
  let productions = musicData?.filter(music => music.type === 'Production');

  let [activeCard, setActiveCard] = useState(null);

  return (
    <section className={'px-7 sm:px-[10%] lg:px-[12%] my-8 min-h-[80vh]'} id={'music'}>
      <h2 className={'mt-24 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black py-12'}>MUSIC</h2>

      {
        activeCard && <MusicOverlay music={activeCard} onClose={() => setActiveCard(null)} />
      }

      <div className={'mb-12'}>
        <h3 className={'flex flex-row items-center text-3xl mb-6'}>
          <PiVinylRecord />
          <span className={'px-4'}>Singles/Albums</span>
        </h3>

        <div className={'grid grid-cols-3'}>
          {
            music?.length ? music.map((card, index) => (
              <Card image={card.photo} alt={card.title} onClick={() => setActiveCard(card)} key={index} />
            )) : ''
          }
        </div>
      </div>

      <div className={'mb-12'}>
        <h3 className={'flex flex-row items-center text-3xl mb-6'}>
          <PiSwap />
          <span className={'px-4'}>DJ Mixes</span>
        </h3>

        <div className={'grid grid-cols-3'}>
          {
            mixes?.length ? mixes.map((card, index) => (
              <Card image={card.photo} alt={card.title} onClick={() => setActiveCard(card)} key={index} />
            )) : ''
          }
        </div>
      </div>

      <div className={'mb-12'}>
        <h3 className={'flex flex-row items-center text-3xl mb-6'}>
          <RiSoundModuleLine />
          <span className={'px-4'}>Productions</span>
        </h3>

        <div className={'grid grid-cols-3'}>
          {
            productions?.length ? productions.map((card, index) => (
              <Card image={card.photo} alt={card.title} onClick={() => setActiveCard(card)} key={index} />
            )) : ''
          }
        </div>
      </div>
    </section>
  )
}