// Home.tsx
'use client';

import { useContext, useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { HomeContext } from './context/HomeContext'; // caminho correto
import { musics } from './data/Music'; // caminho correto

export default function Home() {
  const { playing, configPlayPause } = useContext(HomeContext);
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0); // para controlar a música atual

  const currentMusic = musics[currentMusicIndex];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold">Now Playing</h2>
        <img
          src={currentMusic.image}
          alt={currentMusic.name}
          className="w-full h-48 object-cover mb-4"
        />
        <h3 className="text-md font-semibold">{currentMusic.name}</h3>
        <p className="text-sm">{currentMusic.author}</p>
        <p className="text-sm mt-2">{currentMusic.description}</p>
        <audio controls className="w-full mt-4">
          <source src={currentMusic.urlAudio} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-24">
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

        {/* Music List */}
        <div>
          {musics.map((music, index) => (
            <div key={index} className="cursor-pointer" onClick={() => setCurrentMusicIndex(index)}>
              <h1 className={index === currentMusicIndex ? 'text-[blue]' : ''}>
                {music.author}
              </h1>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
