// Home.tsx
'use client';

import { useContext } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { HomeContext } from './context/HomeContext'; // caminho correto
import { musics } from './data/Music'; // caminho correto

export default function Home() {
  const { playing, configPlayPause } = useContext(HomeContext);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{playing ? 'Playing' : 'Paused'}</h1>
      <div className="flex flex-row">
        <button onClick={configPlayPause}>
          {playing ? (
            <FaPause className="text-[50px] text-[tomato]" />
          ) : (
            <FaPlay className="text-[50px] text-[green]" />
          )}
        </button>
      </div>
      <div>
        {musics.map((music, index) => (
          <div key={index}>
            <h1>{music.author}</h1>
          </div>
        ))}
      </div>
    </main>
  );
}
