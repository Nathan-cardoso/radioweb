'use client';

import { useContext, useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { HomeContext } from './context/HomeContext'; 
import { musics } from './data/Music'; 

export default function Home() {
  const { playing, configPlayPause } = useContext(HomeContext);
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0); 

  const currentMusic = musics[currentMusicIndex];

  return (
    <div className="flex min-h-screen">
      {}
      <aside className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold">Music Info</h2>
        <img
          src={currentMusic.image}
          alt={currentMusic.name}
          className="w-full h-48 object-cover mb-4"
        />
        <h3 className="text-md font-semibold">{currentMusic.name}</h3>
        <p className="text-sm">Author: {currentMusic.author}</p>
        <p className="text-sm mt-2">Description: {currentMusic.description}</p>
      </aside>

      {}
      <main className="flex-1 flex flex-col items-center justify-center">
        {}
        <h1 className="text-3xl font-bold mb-8">{currentMusic.name}</h1>

        {}
        <button onClick={configPlayPause} className="text-center">
          {playing ? (
            <FaPause className="text-[80px] text-[tomato]" />
          ) : (
            <FaPlay className="text-[80px] text-[green]" />
          )}
        </button>
      </main>
    </div>
  );
}
