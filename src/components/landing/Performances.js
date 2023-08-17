import { useContext } from 'react';
import { DataContext } from 'pages';

function Booking(props) {
  let date = new Date(props.date.replace(/-/g, '/')).toLocaleDateString('sv-SE');

  return (
    <div className={'flex flex-row text-center mb-3 text-lg'}>
      <p className={'flex-1'}>{date}</p>
      <p className={'flex-1'}>{props.venue}</p>
      <p className={'flex-1'}>{`${props.start} - ${props.end}`}</p>
    </div>
  );
}

export default function Performances() {
  const performanceData = useContext(DataContext).performances;
  let performances = performanceData?.sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <section className={'px-7 sm:px-[10%] lg:px-[12%] my-8 min-h-[90vh]'} id={'performances'}>
      <h2 className={'mt-32 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black py-12'}>PERFORMANCES</h2>

      <div className={'mt-12 flex flex-col'}>
        {
          performances?.length ? performances.map((performance, index) => (
            <Booking venue={performance.venue} date={performance.date} start={performance.startTime}
                     end={performance.endTime} key={index} />
          )) : 'More performances to be announced'
        }
      </div>
    </section>
  );
}