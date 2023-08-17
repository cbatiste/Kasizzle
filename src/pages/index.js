import { createContext } from 'react';
import { useSanityQuery } from 'utility/SanityClient';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Hero from 'components/landing/Hero';
import Performances from '../components/landing/Performances';
import About from '../components/landing/About';
import Music from '../components/landing/Music';

export const DataContext = createContext(null);

export default function Home() {
  const performancesQuery = `*[_type == "performance"] {
    venue, artist, date, startTime, endTime
  }`;

  const musicQuery = `*[_type == "music"] {
    type, title, artist, description, writtenBy, producedBy, performedBy, source, artwork, trackListing, spotifyURL,
    'photo': photo.asset -> {url, altText, 'dimensions': metadata.dimensions}
  }`;

  let performancesData = useSanityQuery(performancesQuery);
  let musicData = useSanityQuery(musicQuery);
  let apiData = {performances: performancesData, music: musicData};

  return (
    <DataContext.Provider value={apiData}>
      <main className={`flex min-h-screen flex-col`}>
        <Header />

        <div className={'flex flex-col pb-64'}>
          <Hero />

          <Performances />
          <About />
          <Music />
        </div>

        <Footer />
      </main>
    </DataContext.Provider>
  );
}
