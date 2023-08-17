import { FaApple, FaBars, FaInstagram, FaSpotify } from 'react-icons/fa';
import { BsEnvelope } from 'react-icons/bs';
import { useEffect, useState } from 'react';

function HeaderLink(props) {
  return (
    <a className={'mx-3 cursor-pointer hover:text-zinc-400'} href={props.href}>
      <h4 className={'header-light '}>{props.children}</h4>
    </a>
  );
}

export default function Header() {
  let [headerOpaque, setHeaderOpaque] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      let heroHeight = document.getElementById('hero').offsetHeight;
      let scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

      if (scrollY > heroHeight && !headerOpaque) setHeaderOpaque(true);
      else if (scrollY <= heroHeight && headerOpaque) setHeaderOpaque(false);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headerOpaque]);

  return (
    <header className={`fixed left-0 top-0 right-0 items-center py-3 px-5 lg:px-12 xl:px-[5%] z-10
                        transition-all ${headerOpaque ? 'bg-[#0a0a0a]' : 'bg-[#0a0a0a] lg:bg-transparent'}`}>
      <div className={'flex flex-col'}>
        <div className="flex w-full flex-row items-center">
          <div className={'flex-1 text-base hidden lg:flex flex-row'}>
            <HeaderLink href={'#performances'}>PERFORMANCES</HeaderLink>
            <HeaderLink href={'#about'}>ABOUT</HeaderLink>
            <HeaderLink href={'#music'}>MUSIC</HeaderLink>
            <div className={'w-[1px] h-[24px] bg-white mx-3'}></div>
            <HeaderLink href={'https://blog.kasizzle.se'}>BLOG</HeaderLink>
          </div>

          <div className={`${!headerOpaque ? 'lg:opacity-0' : 'opacity-100'} transition-all flex shrink cursor-pointer`}
               onClick={() => window.location.href = '/'}>
            <img className="inline-block w-auto h-[40px] sm:h-[48px]" src="/logo-dark-sm.png" alt="Kasizzle Logo" />
          </div>

          <div className={'flex grow text-2xl pb-1 justify-end lg:hidden'}>
            <FaBars className={'cursor-pointer'} />
          </div>

          <div className={'hidden lg:flex flex-1 justify-end'}>
            <a href={'https://open.spotify.com/artist/5HAbkJVLDtTYmngkW16mrk'} target={'_blank'}
               className={'mx-4 text-2xl'}><FaSpotify /></a>
            <a href={'https://music.apple.com/us/artist/kasizzle/1513360621'} target={'_blank'}
               className={'mx-4 text-2xl'}><FaApple /></a>
            <a href={'https://www.instagram.com/kasizzle/'} target={'_blank'}
               className={'mx-4 text-2xl'}><FaInstagram /></a>
            <a href={'mailto:erik@kasizzle.se'} target={'_blank'} className={'mx-4 text-2xl'}><BsEnvelope /></a>
          </div>
        </div>

        <div className={'flex flex-col hidden'}>
          <div className={'flex flex-col'}>
            <HeaderLink href={'#performances'}>PERFORMANCES</HeaderLink>
            <HeaderLink href={'#about'}>ABOUT</HeaderLink>
            <HeaderLink href={'#music'}>MUSIC</HeaderLink>
            <div className={'w-full h-[1px] bg-neutral-400'}></div>
            <HeaderLink href={'https://blog.kasizzle.se'}>BLOG</HeaderLink>
          </div>

          <div className={'flex-row'}>
            <a href={'https://open.spotify.com/artist/5HAbkJVLDtTYmngkW16mrk'} target={'_blank'}
               className={'mx-4 text-2xl'}><FaSpotify /></a>
            <a href={'https://music.apple.com/us/artist/kasizzle/1513360621'} target={'_blank'}
               className={'mx-4 text-2xl'}><FaApple /></a>
            <a href={'https://www.instagram.com/kasizzle/'} target={'_blank'}
               className={'mx-4 text-2xl'}><FaInstagram /></a>
            <a href={'mailto:erik@kasizzle.se'} target={'_blank'} className={'mx-4 text-2xl'}><BsEnvelope /></a>
          </div>
        </div>
      </div>
    </header>
  );
}