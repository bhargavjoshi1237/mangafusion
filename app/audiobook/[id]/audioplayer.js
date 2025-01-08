"use client";
import { useState, useRef, useEffect } from 'react';

const AudioPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState('0:00');
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      const currentTime = audio.currentTime;
      const duration = audio.duration;
      const progress = (currentTime / duration) * 100;
      setProgress(progress);
      setRemainingTime(formatTime(duration - currentTime));
    };

    const setInitialProgress = () => {
      setProgress(0);
      setRemainingTime(formatTime(audio.duration));
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', setInitialProgress);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', setInitialProgress);
    };
  }, []);

  return (
    <div className="w-full mt-4 h-[48px] rounded-lg border border-[#474747] flex items-center justify-center bg-[#212121]">
      <audio ref={audioRef} className="hidden">
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <button onClick={togglePlayPause} className="focus:outline-none">
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" className="transform transition-transform duration-300 ml-2 rotate-0">
            <path fill="white" d="M6 19h4V5H6zm8-14v14h4V5z"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" className="transform ml-2 transition-transform duration-300 rotate-0">
            <path fill="white" d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>
      <input
        type="range"
        className="w-full mr-5 h-1 ml-4 bg-[#a4a4a4] rounded-lg appearance-none cursor-pointer  custom-range"
        value={progress}
        onChange={(e) => {
          const seekTime = (audioRef.current.duration / 100) * e.target.value;
          audioRef.current.currentTime = seekTime;
          setProgress(e.target.value);
        }}
      />
      <p className='fon text-sm pr-4'>{remainingTime}</p>
    </div>
  );
};

export default AudioPlayer;