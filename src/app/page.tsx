'use client'

import { useContext, useState } from "react";
import { FaPlay, FaPause, FaVolumeOff, FaVolumeUp, FaForward, FaBackward } from 'react-icons/fa';
import { HomeContext } from "./context/HomeContext";
import { musics } from "./data/Music";

export default function Home() {
  const {
     playing,
     volume,
     muted,
     currentTime,
     totalTime,
     panner,
     audioIndex,
     configPlayPause,
     configAudioIndex,
     configVolume,
     configCurrentTime,
     configMuted
  } = useContext(HomeContext);

  const [showPlaylist, setShowPlaylist] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 bg-black">
      {/* Player Principal */}
      <section className="flex flex-col items-center justify-center bg-white p-5 rounded-lg shadow-md w-[300px]">
        {musics[audioIndex] ? (
          <>
            <img 
              src={musics[audioIndex].image} 
              alt={musics[audioIndex].name} 
              className="w-48 h-48 rounded-md object-cover mb-4" 
            />
            <h2 className="text-lg font-semibold">{musics[audioIndex].name}</h2>
            <p className="text-gray-500 mb-4">{musics[audioIndex].author}</p>

            <div className="flex flex-row items-center space-x-4 mb-4">
              <button onClick={() => configAudioIndex(audioIndex - 1)}>
                <FaBackward className="text-[30px] text-gray-500" />
              </button>

              <button onClick={configPlayPause}>
                {playing ? 
                  (<FaPause className="text-[40px] text-[tomato]" />) : 
                  (<FaPlay className="text-[40px] text-[tomato]" />)
                }
              </button>

              <button onClick={() => configAudioIndex(audioIndex + 1)}>
                <FaForward className="text-[30px] text-gray-500" />
              </button>
            </div>

            {/* Barra de progresso */}
            <input 
              type="range" 
              min="0" 
              max={totalTime} 
              value={currentTime} 
              onChange={(e) => configCurrentTime(Number(e.target.value))}
              className="w-full mb-4"
            />

            <div className="flex flex-row items-center space-x-2">
              <button onClick={configMuted}>
                {muted ? 
                  (<FaVolumeOff className="text-[25px] text-[tomato]" />) : 
                  (<FaVolumeUp className="text-[25px]" />)
                }
              </button>

              <input
                type="range"
                min={0}
                max={1}
                step="0.01"
                value={volume}
                onChange={(e) => configVolume(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </>
        ) : (
          <p className="text-white">Música não encontrada</p>
        )}
      </section>

      {/* Botão para abrir a playlist */}
      <button 
        className="mt-6 text-blue-500 hover:underline" 
        onClick={() => {
          setShowPlaylist(!showPlaylist);
          console.log(showPlaylist); // Verifica o estado
        }}>
        {showPlaylist ? "Hide Playlist" : "Show Playlist"}
      </button>

      {/* Playlist Sidebar */}
      {showPlaylist && (
        <aside className="absolute right-0 top-0 h-full w-[300px] bg-gray-800 shadow-lg p-5 overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4 text-white">Playlist</h3>
          <div className="space-y-4">
            {musics.map((music, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg cursor-pointer ${audioIndex === index ? 'bg-gray-600' : 'hover:bg-gray-700'}`} 
                onClick={() => configAudioIndex(index)}
              >
                <p className="font-semibold text-green-500">{music.name}</p>
                <p className="text-sm text-white">{music.author}</p>
              </div>
            ))}
          </div>
        </aside>
      )}
    </main>
  );
}
