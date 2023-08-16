import {useEffect, useState} from "react";
import styles from './Header.module.css';
import {FaApple, FaBars, FaInstagram, FaSpotify, FaTwitter} from "react-icons/fa";

function HeaderLink(props) {
  return (
    <a className={'mx-3 cursor-pointer hover:text-zinc-400'} href={props.href}>
      <h4 className={'header-light '}>{props.children}</h4>
    </a>
  )
}

export default function Header() {
  return (
    <header>
      <nav className={`${styles.header} items-center py-3 px-10 lg:px-12 xl:px-[5%] z-10`}>
        <div className="flex w-full flex-row items-center">
          <div className={'flex-1 text-base hidden lg:flex flex-row'}>
            <HeaderLink href={'#performances'}>PERFORMANCES</HeaderLink>
            <HeaderLink href={'#about'}>ABOUT</HeaderLink>
            <HeaderLink href={'#music'}>MUSIC</HeaderLink>
            <div className={'w-[1px] h-[24px] bg-white mx-3'}></div>
            <HeaderLink href={'https://journal.kasizzle.se'}>BLOG</HeaderLink>
          </div>

          <div className="flex shrink cursor-pointer" onClick={() => window.location.href='/'}>
            <img className="inline-block h-[40px] sm:h-[48px] w-auto" src="/logo-dark-sm.png" alt="Kasizzle Logo"/>
          </div>

          <div className={'flex grow text-2xl pt-1 justify-end lg:hidden'}>
            <FaBars />
          </div>

          <div className={'hidden lg:flex flex-1 justify-end'}>
            <FaSpotify className={'text-2xl mx-4'} />
            <FaApple className={'text-2xl mx-4'} />
            <FaInstagram className={'text-2xl mx-4'} />
            <FaTwitter className={'text-2xl mx-4'} />
          </div>
        </div>
      </nav>
    </header>
  );
}