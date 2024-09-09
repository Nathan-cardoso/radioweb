
'use client';

import React, { createContext, ReactNode, useState, useEffect, useRef } from 'react';

type HomeContextData = {
  playing: boolean;
  configPlayPause: () => void;
};

export const HomeContext = createContext({} as HomeContextData);

type ProviderProps = {
  children: ReactNode;
};

export default function HomeContextProvider({ children }: ProviderProps) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {

    if (!audioRef.current) {
      audioRef.current = new Audio('../../public/music/audio.mp3'); 
    }

  }, []);

  const configPlayPause = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setPlaying(!playing); 
    }
  };

  return (
    <HomeContext.Provider value={{ playing, configPlayPause }}>
      {children}
    </HomeContext.Provider>
  );
}
