import styles from './Footer.module.css';
import {BsEnvelope, BsTelephone} from "react-icons/bs";
import {FaApple, FaInstagram, FaRegCopyright, FaSpotify} from "react-icons/fa";
import {SiYoutubemusic} from "react-icons/si";
import {AiFillAmazonCircle} from "react-icons/ai";

export default function Footer() {
  return (
    <footer className={`${styles.footer} relative py-20 mt-24 px-8 lg:px-24 xl:px-36 w-full`}>
      <div className={"max-w-[1600px] flex flex-col m-auto z-20"}>
        <h4 className={'text-5xl font-bold'}>CONTACT</h4>

        <div className={'flex flex-row mx-[5%] pt-8'}>
          <div className={'flex grow flex-col mt-12'}>
            <div className={'text-lg mb-8'}>
              <a className={'flex flex-row items-center mb-4'} href={"mailto:erik@kasizzle.se"}>
                <BsEnvelope className={"text-xl mr-4"}/>
                <span>erik@kasizzle.se</span>
              </a>
              <p className={'flex flex-row items-center mb-4'}>
                <BsTelephone className={"text-xl mr-4"}/>
                <span>+46 70 860 19 31</span>
              </p>
              <a className={'flex flex-row items-center mb-4'} href={"https://www.instagram.com/kasizzle/"}>
                <FaInstagram className={"text-xl mr-4"}/>
                <span className={'break-all'}>@kasizzle</span>
              </a>
            </div>

            <div className={'mt-12'}>
              <h4 className={'text-3xl mb-8'}>Listen:</h4>

              <div className={'flex flex-row items-center'}>
                <a href={'https://open.spotify.com/artist/5HAbkJVLDtTYmngkW16mrk'} target={'_blank'}
                   className={'mx-4 text-5xl hover:scale-105 duration-100'}><FaSpotify />
                </a>
                <a href={'https://music.apple.com/us/artist/kasizzle/1513360621'} target={'_blank'}
                   className={'mx-4 text-5xl hover:scale-105 duration-100'}><FaApple />
                </a>
                <a href={'https://music.youtube.com/channel/UCPTtsM8DUt7mNhkry72wSBg'} target={'_blank'}
                   className={'mx-4 text-5xl hover:scale-105 duration-100'}><SiYoutubemusic />
                </a>
                <a href={'https://music.amazon.com/artists/B088MFKTLC/kasizzle'} target={'_blank'}
                   className={'mx-4 text-6xl hover:scale-105 duration-100'}><AiFillAmazonCircle className={'p-[1px]'} />
                </a>
              </div>
            </div>
          </div>

          <div className={'flex w-[320px] flex-col'}>
            <img src={'/profile/Kaz.jpg'} className={'w-full'} />

            <div className={'mt-4'}>
              <p className={'mt-4'}>Erik Larsson (Kasizzle)</p>
              <p className={'mt-4 leading-relaxed'}>
                Music producer, DJ,<br/>
                Founder of <a href={'https://fyrenevenemang.se'} target={'_blank'} className={'hover:underline'}>Fyren Evenemang</a><br/>
                CEO of Kasizzle AB
              </p>
            </div>
          </div>
        </div>

        <p className={"flex flex-row items-center justify-center mt-28 mb-4 text-neutral-300"}>
          <FaRegCopyright className={'mr-2 mb-[1px]'} /> Kasizzle AB {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}