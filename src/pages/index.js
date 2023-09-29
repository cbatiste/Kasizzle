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
    _id, venue, artist, date, startTime, endTime
  }`;

  const musicQuery = `*[_type == "music"] {
    _id, title, artist, description, writtenBy, producedBy, performedBy, source, artwork, trackListing, spotifyURL,
    'photo': photo.asset -> {url, altText, 'dimensions': metadata.dimensions}
  }`;

  const mixesQuery = `*[_type == "mix"] {
    _id, title, artist, description,
    'audioFile': audioFile.asset -> url,
    'photo': photo.asset -> {url, altText, 'dimensions': metadata.dimensions}
  }`;

  let performancesData = useSanityQuery(performancesQuery);
  let musicData = useSanityQuery(musicQuery);
  let mixesData = useSanityQuery(mixesQuery);
  let apiData = { performances: performancesData, music: musicData, mixes: mixesData };

  return (
    <DataContext.Provider value={apiData}>
      <main className={`flex min-h-screen flex-col`}>
        <Header />

        <div className={'flex flex-col pb-48 md:pb-64'}>
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
