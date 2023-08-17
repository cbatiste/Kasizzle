import styles from './Header.module.css';
import { FaApple, FaInstagram, FaSpotify } from 'react-icons/fa';
import { BsEnvelope } from 'react-icons/bs';
import { useEffect, useState } from 'react';

function HeaderLink(props) {
  return (
    <a className={'my-3 lg:my-0 mx-6 lg:mx-3 cursor-pointer hover:text-zinc-400'} href={props.href}
       target={props.target}>
      <h4 className={'text-xl lg:text-basis header-light tracking-wide'}
          onClick={() => props.onClick && props.onClick()}>{props.children}</h4>
    </a>
  );
}

export default function Header() {
  let [dropdownVisible, setDropdownVisible] = useState(false);
  let [headerOpaque, setHeaderOpaque] = useState(false);

  const handleDropdownSelect = () => {
    if (dropdownVisible) setDropdownVisible(false);
  };

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
    <header className={`fixed left-0 top-0 right-0 items-center z-10 transition-all
                        ${headerOpaque ? 'bg-[#0a0a0a]' : 'bg-[#0a0a0a] lg:bg-transparent'}`}>
      <div className={'flex flex-col'}>
        <div className="flex w-full flex-row items-center py-3 px-5 lg:px-12 xl:px-[5%]">
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

          <div className={'flex grow justify-end lg:hidden'}>
            <div onClick={() => setDropdownVisible(state => !state)} className={styles.selector}>
              <div className={`${styles.barIconWrapper}`}>
                <span className={`${styles.barIcon} ${dropdownVisible ? styles.barIconActive : ''}`}></span>
                <span className={`${styles.barIcon} ${dropdownVisible ? styles.barIconActive : ''}`}></span>
                <span className={`${styles.barIcon} ${dropdownVisible ? styles.barIconActive : ''}`}></span>
              </div>
            </div>
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

        <div
          className={`flex flex-col ${dropdownVisible ? 'border-t max-h-[320px] duration-500' : 'max-h-0 duration-300'}
                      transition-all overflow-hidden lg:hidden border-neutral-900`}>
          <div className={'flex flex-col mt-4'}>
            <HeaderLink onClick={handleDropdownSelect} href={'#performances'}>PERFORMANCES</HeaderLink>
            <HeaderLink onClick={handleDropdownSelect} href={'#about'}>ABOUT</HeaderLink>
            <HeaderLink onClick={handleDropdownSelect} href={'#music'}>MUSIC</HeaderLink>
            <HeaderLink onClick={handleDropdownSelect} href={'https://blog.kasizzle.se'}
                        target={'_blank'}>BLOG</HeaderLink>
          </div>

          <div className={'flex flex-row p-4 mt-2 mb-6'}>
            <a href={'https://open.spotify.com/artist/5HAbkJVLDtTYmngkW16mrk'} target={'_blank'}
               onClick={handleDropdownSelect}
               className={'mx-3 text-4xl lg:text-2xl'}><FaSpotify /></a>
            <a href={'https://music.apple.com/us/artist/kasizzle/1513360621'} target={'_blank'}
               onClick={handleDropdownSelect}
               className={'mx-3 text-4xl lg:text-2xl'}><FaApple /></a>
            <a href={'https://www.instagram.com/kasizzle/'} target={'_blank'}
               onClick={handleDropdownSelect}
               className={'mx-3 text-4xl lg:text-2xl'}><FaInstagram /></a>
            <a href={'mailto:erik@kasizzle.se'} target={'_blank'}
               onClick={handleDropdownSelect}
               className={'mx-3 text-4xl lg:text-2xl'}><BsEnvelope /></a>
          </div>

          <div className={'w-full h-[1px] bg-neutral-900'}></div>
        </div>
      </div>
    </header>
  );
}