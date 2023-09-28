import { useEffect, useRef, useState } from 'react';
import { PiPauseFill, PiPlayFill } from 'react-icons/pi';
import styles from './AudioPlayer.module.css';
import WaveSurfer from 'wavesurfer.js';

export default function AudioPlayer(props) {
  const wavesurfer = useRef(null);
  const [ playing, setPlaying ] = useState(false);

  const waveformRef = useRef();
  const hoverRef = useRef();
  const timeRef = useRef();
  const durationRef = useRef();

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.height = 80;

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
  gradient.addColorStop(0, '#656666'); // Top color
  gradient.addColorStop((canvas.height * 0.7) / canvas.height, '#656666'); // Top color
  gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff'); // White line
  gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff'); // White line
  gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#b1b1b1'); // Bottom color
  gradient.addColorStop(1, '#b1b1b1'); // Bottom color

  const progressGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
  progressGradient.addColorStop(0, '#ee772f'); // Top color
  progressGradient.addColorStop((canvas.height * 0.7) / canvas.height, '#eb4926'); // Top color
  progressGradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff'); // White line
  progressGradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff'); // White line
  progressGradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#f6b094'); // Bottom color
  progressGradient.addColorStop(1, '#f6b094'); // Bottom color

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.round(seconds) % 60;
    const paddedSeconds = `0${secondsRemainder}`.slice(-2);
    return `${minutes}:${paddedSeconds}`;
  };

  useEffect(() => {
    if (!wavesurfer.current) return;

    if (playing) wavesurfer.current.play();
    else wavesurfer.current.pause();
  }, [ playing ]);

  useEffect(() => {
    if (!waveformRef.current) return;

    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: gradient,
      progressColor: progressGradient,
      barWidth: 2,
      barGap: 2,
      height: 72,
      url: props.assetURL
    });

    wavesurfer.current.on('ready', () => {
      if (!waveformRef.current) return;
      
      wavesurfer.current.on('interaction', () => {
        setPlaying(true);
      });

      waveformRef.current.addEventListener('pointermove', event => {
        if (hoverRef.current) hoverRef.current.style.width = `${event.offsetX}px`;
      });

      wavesurfer.current.on('decode', (duration) => {
        if (durationRef.current) durationRef.current.textContent = formatTime(duration);
      });
      wavesurfer.current.on('timeupdate', (currentTime) => {
        if (timeRef.current) timeRef.current.textContent = formatTime(currentTime);
      });
    });

  }, [ props.assetURL ]);

  return (
    <div className={'flex flex-row py-6 items-center'}>
      <div
        className={'flex flex-col items-center justify-center bg-white hover:bg-neutral-200 w-[64px] h-[64px] mr-4 rounded-full cursor-pointer'}
        onClick={() => setPlaying(playing => !playing)}
      >
        {
          playing ?
            <PiPauseFill className={'text-4xl text-neutral-900'} /> :
            <PiPlayFill className={'text-4xl text-neutral-900'} />
        }
      </div>
      <div className={'flex-grow'}>
        <div ref={waveformRef} className={styles.waveform}>
          <div ref={timeRef} className={styles.time}>0:00</div>
          <div ref={durationRef} className={styles.duration}>0:00</div>
          <div ref={hoverRef} className={styles.hover}></div>
        </div>
      </div>
    </div>
  );
}