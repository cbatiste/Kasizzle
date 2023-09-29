import { motion } from 'framer-motion';
import { useContext, useEffect, useRef, useState } from 'react';
import { DataContext } from 'pages';
import useOnScreen from 'utility/useOnScreen';
import { BsChevronDoubleDown, BsChevronDoubleUp } from 'react-icons/bs';

const datePassed = (date1, date2) => new Date(date1).setHours(0, 0, 0, 0) < new Date(date2).setHours(0, 0, 0, 0);

function Booking(props) {
  let date = new Date(props.date.replace(/-/g, '/')).toLocaleDateString('sv-SE');
  let passed = datePassed(props.date, Date.now());

  return (
    <motion.div
      className={`flex flex-col lg:flex-row lg:text-center mb-6 lg:mb-3 text-lg ${passed ? 'text-neutral-400' : ''}`}
      variants={props.variants}>
      <p className={'sm:hidden header-light flex-1 text-xl mb-1'}>{date}</p>
      <p className={'hidden sm:block flex-1'}>{date}</p>
      <p className={'flex-1 text-2xl sm:text-lg mb-2 sm:m-0'}>{props.venue}</p>
      <p className={'flex-1 text-[0.9em] sm:text-lg'}>{`${props.start} - ${props.end}`}</p>
    </motion.div>
  );
}

export default function Performances() {
  const performanceData = useContext(DataContext).performances;
  const [ showingPrevious, setShowingPrevious ] = useState(false);

  let [ performances, setPerformances ] = useState(performanceData?.filter(event =>
    !datePassed(event.date, Date.now())
  ).sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  ));

  useEffect(() => {
    if (showingPrevious) {
      setPerformances(performanceData?.sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
      ));
    } else {
      setPerformances(performanceData?.filter(event =>
        !datePassed(event.date, Date.now())
      ).sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
      ));
    }
  }, [ performanceData, showingPrevious ]);

  let containerRef = useRef(null);
  let containerVisible = useOnScreen(containerRef);

  const performancesAnim = { visible: { transition: { staggerChildren: 0.2 } } };
  const performancesItemAnim = {
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 24 } },
    hidden: { opacity: 0, y: 10 }
  };

  return (
    <section className={'px-7 sm:px-[10%] lg:px-[12%] my-12 min-h-[90vh]'} id={'performances'}>
      <h2 className={'mt-8 md:mt-32 text-5xl md:text-6xl lg:text-7xl font-black py-12'}>UPCOMING</h2>

      <motion.div className={'mt-4 md:mt-12 flex flex-col'}
                  initial="hidden"
                  animate={containerVisible ? 'visible' : ''}
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  variants={performancesAnim}
                  ref={containerRef}>
        <div className={'flex flex-row justify-center mb-6'}>
          <a className={'cursor-pointer text-neutral-400 header-light text-base hover:text-neutral-500 select-none'}
             onClick={() => setShowingPrevious(showing => !showing)}>
            {
              showingPrevious ?
                <span className={'flex flex-row items-center'}><BsChevronDoubleUp className={'mr-2'} /> Hide past performances</span> :
                <span className={'flex flex-row items-center'}><BsChevronDoubleDown className={'mr-2'} /> Show past performances</span>
            }
          </a>
        </div>

        {
          performances?.length ? performances.map((performance) => (
            <Booking venue={performance.venue} date={performance.date} start={performance.startTime}
                     end={performance.endTime} key={performance._id} variants={performancesItemAnim} />
          )) : 'More performances to be announced'
        }
      </motion.div>
    </section>
  );
}