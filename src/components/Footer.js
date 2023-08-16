import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={`${styles.footer} relative py-20 mt-24 px-8 lg:px-24 xl:px-36 w-full`}>
      <div className={"max-w-[1600px] flex flex-col m-auto z-20"}>
        <h4 className={'text-3xl font-bold'}>CONTACT</h4>
      </div>
    </footer>
  );
}