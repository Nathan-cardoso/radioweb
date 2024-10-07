'use client'

import React, { createContext, ReactNode, useEffect, useState } from 'react';

type HomeContextData = {
  playing: boolean;
  volume: number;
  panner: number;
  audioIndex: number;
  currentTime: number;
  totalTime: number;
  muted: boolean;
  configPlayPause: () => void;
  configAudio: () => void;
  configAudioIndex: (index: number) => void;
  configVolume: (value: number) => void;
  configPanner: (value: number) => void;
  configCurrentTime: (value: number) => void;
  configMuted: () => void;
};

export const HomeContext = createContext({} as HomeContextData);

type ProviderProps = {
  children: ReactNode;
};

const HomeContextProvider = ({ children }: ProviderProps) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [panner, setPanner] = useState(0);
  const [audioIndex, setAudioIndex] = useState(0);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [gain, setGain] = useState<GainNode | null>(null);
  const [stereo, setStereo] = useState<StereoPannerNode | null>(null);

  useEffect(() => {

    configAudio()
    
    if (audio) {
      if (playing) {
        play();
      }

      audio.onloadedmetadata = () => {
        setTotalTime(audio.duration);
      };

      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
      };

      audio.onended = () => {
        configAudioIndex(audioIndex + 1); // Próxima música quando terminar
      };
    }
  }, [audio]);

  const configCurrentTime = (value: number) => {
    if (!audio) return;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const configAudio = () => {
    configAudioIndex(0); // Inicia na primeira música
  };

  const configAudioIndex = (index: number) => {
    const newAudioIndex = index % 3; // Cicla entre os índices das músicas
    const updatedAudio = new Audio(`audios/audio${newAudioIndex + 1}.mp3`);

    if (audio) {
      pause();
    }

    setAudioIndex(newAudioIndex);
    setAudio(updatedAudio);

    const audioContext = new AudioContext();
    const media = audioContext.createMediaElementSource(updatedAudio);
    const updatedGain = audioContext.createGain();
    const updatedStereo = audioContext.createStereoPanner();

    media.connect(updatedGain);
    updatedGain.connect(updatedStereo);
    updatedStereo.connect(audioContext.destination);

    updatedAudio.onplay = () => {
      audioContext.resume();
    };

    setGain(updatedGain);
    setStereo(updatedStereo);
  };

  const configVolume = (value: number) => {
    if (!gain) return;
    gain.gain.value = value;
    setVolume(value);
  };

  const configMuted = () => {
    if (!audio) return;
    audio.muted = !muted;
    setMuted(!muted);
  };

  const configPanner = (value: number) => {
    if (!stereo) return;
    stereo.pan.value = value;
    setPanner(value);
  };

  const configPlayPause = () => {
    if (playing) {
      pause();
    } else {
      play();
    }
    setPlaying(!playing);
  };

  const play = () => {
    if (!audio) return;
    audio.play();
  };

  const pause = () => {
    if (!audio) return;
    audio.pause();
  };

  return (
    <HomeContext.Provider
      value={{
        playing,
        volume,
        panner,
        audioIndex,
        currentTime,
        totalTime,
        muted,
        configPlayPause,
        configAudio,
        configAudioIndex,
        configVolume,
        configPanner,
        configCurrentTime,
        configMuted,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeContextProvider;
